/**
 * Created by dan on 10/05/2017.
 */

import TalkApi from "../api/talk";
import Talk from "../model/talk";

/**
 * Takes a talkID
 * @returns {Promise.<*>}
 */
export function getTalk(talkID) {
  return TalkApi.getTalk(talkID).then(result => {
    return new Talk(
      result.id,
      result.name,
      result.tracks,
      "en",
      result.description,
      result.speakers.map(speaker => speaker.id),
      result.videoURL,
      result.type
    );
  });
}

// Swap array of talk IDs for array of talks
export function mapIDArrayToValue(ids, values) {
  return ids.map(id => {
    return values[id];
  });
}
