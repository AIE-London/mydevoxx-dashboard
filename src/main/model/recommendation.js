/**
 * Created by dan on 07/05/2017.
 */

export default class Recommendation {
  _title;
  _link;
  _imageurl;
  _type;
  _source;

  constructor(title, link, imageurl, type, source) {
    this._title = title + "";
    this._link = link + "";
    this._imageurl = imageurl;
    this._type = type + "";
    this._source = source + "";
  }

  get title() {
    return this._title;
  }

  get link() {
    return this._link;
  }

  get imageurl() {
    return this._imageurl;
  }

  get type() {
    return this._type;
  }

  get source() {
    return this._source;
  }
}
