import React from 'react';
import {useYoutubeApi} from "../context/YoutubeApiContext";
import {useQuery} from "@tanstack/react-query";


export default function ChannelInfo({id, name}) {
  const {youtube} = useYoutubeApi();

  // 5분에 한번씩 새로 받아옴
  const {error, isLoading, data:url}
    = useQuery(['channel',id], () =>
      youtube.channelImageURL(id),{staleTime:1000 * 60 * 5});
 // ******************************************
  return (
    <div className="flex my-4 mb-8 items-center">
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😖</p>}

      {url && <img src={url} alt="name" className="w-10 h-10 rounded-full"/>}
      <p className="text-lg font-medium ml-2">{name}</p>
    </div>
  );
};