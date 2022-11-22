import axios from 'axios';

export default class FakeYoutubeClient {

  async search(params) {
    return params.relatedToVideoId ? axios.get('/videos/search.json')
      : axios.get('/videos/related.json')
  }
  async videos() {
    return axios.get('/videos/popular.json');
  }
  async channels() {
    return axios.get('/videos/channel.json');
  }
}
