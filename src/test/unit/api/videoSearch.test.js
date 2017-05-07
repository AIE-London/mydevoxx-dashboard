/**
 * Created by dan on 07/05/2017.
 */

import { getKindId } from "../../../main/api/videoSearch";

let sampleVideoResult = {
  kind: "youtube#searchResult",
  etag: '"m2yskBQFythfE4irbTIeOgYYfBU/N5TunfUCAILvRZpI8ltNleJAlUE"',
  id: {
    kind: "youtube#video",
    videoId: "7FsJ7CKG-DM"
  },
  snippet: {
    publishedAt: "2016-06-16T16:50:06.000Z",
    channelId: "UCxIamwHotqAAdmecaKT9WpA",
    title: "Book publishing for developers with Gitbook by John Stevenson",
    description: "Have fun writing books and tutorials using markdown and Gitbook, an Open Source app for generating a responsive website and ebook formats of your content.",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/7FsJ7CKG-DM/default.jpg",
        width: 120,
        height: 90
      },
      medium: {
        url: "https://i.ytimg.com/vi/7FsJ7CKG-DM/mqdefault.jpg",
        width: 320,
        height: 180
      },
      high: {
        url: "https://i.ytimg.com/vi/7FsJ7CKG-DM/hqdefault.jpg",
        width: 480,
        height: 360
      }
    },
    channelTitle: "Devoxx UK",
    liveBroadcastContent: "none"
  }
};

let samplePlaylistResult = {
  kind: "youtube#searchResult",
  etag: '"m2yskBQFythfE4irbTIeOgYYfBU/kXgLiFXHpPPYkivmRFcXY3QOiAw"',
  id: {
    kind: "youtube#playlist",
    playlistId: "PLKuh52zVrL6l8RfKkezmHSMCcVqb2_NCC"
  },
  snippet: {
    publishedAt: "2016-06-16T09:39:34.000Z",
    channelId: "UCxIamwHotqAAdmecaKT9WpA",
    title: "Methodology & Culture",
    description: "Presentations from the Methodology & Culture track at Devoxx UK. Talks are focused on software development methodologies, developer culture and related ...",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/tIYPATalcGs/default.jpg",
        width: 120,
        height: 90
      },
      medium: {
        url: "https://i.ytimg.com/vi/tIYPATalcGs/mqdefault.jpg",
        width: 320,
        height: 180
      },
      high: {
        url: "https://i.ytimg.com/vi/tIYPATalcGs/hqdefault.jpg",
        width: 480,
        height: 360
      }
    },
    channelTitle: "Devoxx UK",
    liveBroadcastContent: "none"
  }
};

test("Should return correct id & kind for a video.", () => {
  expect(getKindId(sampleVideoResult)).toEqual({
    id: "7FsJ7CKG-DM",
    kind: "video"
  });
});

test("Should return correct id & kind for a playlist.", () => {
  expect(getKindId(samplePlaylistResult)).toEqual({
    id: "PLKuh52zVrL6l8RfKkezmHSMCcVqb2_NCC",
    kind: "playlist"
  });
});
