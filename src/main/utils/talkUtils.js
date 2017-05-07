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

export function getTopSpeakers(talks) {
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
