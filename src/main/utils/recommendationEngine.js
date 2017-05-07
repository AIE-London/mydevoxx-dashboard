/**
 * Created by dan on 07/05/2017.
 */

import Recommendation from "../model/recommendation";
import { getVideos } from "../api/videoSearch";

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
  let youtubeRequests = topTracks.map(track => {
    // fire off request to YT api.
    return getVideos(track.name).then(result => {
      console.log(result);
      talkRecommendations = talkRecommendations.concat(
        result.map(
          recommendation =>
            new Recommendation(
              recommendation.title,
              recommendation.link,
              recommendation.imageUrl,
              recommendation.kind,
              "tracks"
            )
        )
      );
    });
  });

  return Promise.all(youtubeRequests).then(() => {
    console.log(talkRecommendations);
    return shuffleArray(
      [].concat(speakerRecommendations).concat(talkRecommendations)
    );
  });
}

/**
 *  Shuffles an array and then cuts it down to first 5 items.
 *  @return {Array}
 */
export function shuffleArray(o) {
  let arrayLimit = 5;
  for (
    var j, x, i = o.length;
    i;
    (j = parseInt(Math.random() * i)), (x = o[--i]), (o[i] = o[j]), (o[j] = x)
  );
  return o.filter(() => arrayLimit-- > 0);
}
