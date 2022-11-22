export default class Youtube {

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
        },
      })
      .then((res) => res.data.items);
  }

  // 채널에 대한 상세한 정보 가져오기
  async channelImageURL(id){
    return this.apiClient.channels({
      params: {
        part: 'snippet',
        id
      },
    })
    .then((res) =>{
        return res.data.items[0].snippet.thumbnails.default.url
    });
  }

  // 연관된 비디오 목록 가져오기
  async relatedVideos(id){
    return this.apiClient
    .search({
      params:{
        part: 'snippet',
        maxResults: 25,
        type:'video',
        relatedToVideoId:id
      }})
    .then((res) =>
      res.data.items.map((item) =>
        ({
          ...item,
          id: item.id.videoId
        })));
  }
}
