/**
 * Created by dan on 07/05/2017.
 */

import Recommendation from "../model/recommendation";

/*
  Utilities
 */
import { getTopTracks } from "./talkUtils";

export function recommendGlobal(talks, speakers) {
  let topTracks = getTopTracks(talks);
  let speakerLimit = 3;

  /*
    Recommend based on speakers
   */
  let speakerRecommendations = speakers
    .filter(speaker => speakerLimit-- > 0)
    .map(speaker => {
      return new Recommendation(
        speaker.speaker.name + "'s Blog",
        speaker.speaker.blog,
        speaker.speaker.imageurl,
        "blog",
        "speakers"
      );
    });

  /*
   Recommend based on talks
   */
  let talkRecommendations = [];
  let youtubeRequests = speakers
    .filter(speaker => speakerLimit-- > 0)
    .map(speaker => {
      // fire off request to YT api.
    });

  Promise.all(youtubeRequests).then(() => {});

  return [].concat(speakerRecommendations).concat();
}
