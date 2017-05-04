/**
 * Created by dan on 03/05/2017.
 */
export default class Talk {
  _talkId;
  _title;
  _tracks;
  _language;
  _summary;
  _speakers;
  _videoUrl;

  constructor(talkId, title, tracks, language, summary, speakers, videoUrl) {
    this._talkId = talkId;
    this._title = title;
    this._tracks = tracks;
    this._language = language;
    this._summary = summary;
    this._speakers = speakers;
    this._videoUrl = videoUrl;
  }

  get videoUrl() {
    return this._videoUrl;
  }

  get id() {
    return this._talkId;
  }

  get title() {
    return this._title;
  }

  get tracks() {
    return this._tracks;
  }

  get language() {
    return this._language;
  }

  get summary() {
    return this._summary;
  }

  get speakers() {
    return this._speakers;
  }
}
