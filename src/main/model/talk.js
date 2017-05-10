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
  _room;
  _startTime;
  _endTime;
  _type;

  constructor(
    talkId,
    title,
    tracks,
    language,
    summary,
    speakers,
    videoUrl,
    type
  ) {
    this._talkId = talkId;
    this._title = title;
    this._tracks = tracks;
    this._language = language;
    this._summary = summary;
    this._speakers = speakers;
    this._videoUrl = videoUrl;
    this._type = type;
  }

  get type() {
    return this._type;
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

  set room(room) {
    this._room = room;
  }

  set startTime(start) {
    this._startTime = start;
  }

  set endTime(end) {
    this._endTime = end;
  }

  get room() {
    return this._room;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }
}
