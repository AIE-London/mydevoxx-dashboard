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
  /*
    Recommend based on speakers
   */
  let speakerRecommendations = speakers.map(speaker => {
    return new Recommendation(
      speaker.speaker.name + "'s Blog",
      speaker.speaker.blog,
      speaker.speaker.imageurl,
      "blog",
      "speakers"
    );
  });
  return speakerRecommendations;
}
