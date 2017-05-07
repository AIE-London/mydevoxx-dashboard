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
  let topSpeakers = [];
  return [
    new Recommendation(
      "Welcome to Devoxx",
      "http://devoxx.co.uk",
      null,
      "talk",
      "tracks"
    )
  ];
}
