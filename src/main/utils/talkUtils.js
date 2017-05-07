/**
 * Created by dan on 07/05/2017.
 */

export function getTopTracks(talks) {
  let tracks = talks.reduce((result, talk) => {
    talk.tracks.forEach(track => {
      if (!result[track]) {
        result[track] = 1;
      } else {
        result[track]++;
      }
    });
    return result;
  }, {});
  let top = Object.keys(tracks).map(key => {
    return { name: key, count: tracks[key] };
  });

  let trackMax = 3;

  return top
    .sort((tracka, trackb) => {
      return trackb.count - tracka.count;
    })
    .filter(track => {
      if (trackMax-- > 0) {
        return true;
      }
      return false;
    });
}

export function getTimeForTalk(talk) {
  switch (talk.type) {
    case "Conference":
      return 50;
    case "Opening Keynote":
      return 20;
    case "Closing Keynote":
      return 45;
    case "Hands-on Labs":
      return 120;
    case "BOF (Birds of a Feather)":
      return 60;
    case "Quickie Sessions":
      return 15;
    case "Ignite Sessions":
      return 5;
    default:
      return 0;
  }
}
