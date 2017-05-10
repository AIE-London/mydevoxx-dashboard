/**
 * Created by dan on 07/05/2017.
 */

export default class Recommendation {
  _title;
  _link;
  _linkname;
  _imageurl;
  _type;
  _source;

  constructor(title, link, linkname, imageurl, type, source) {
    this._title = title + "";
    this._link = this._parseUrl(link) + "";
    this._linkname = linkname + "";
    this._imageurl = imageurl;
    this._type = type + "";
    this._source = source + "";
  }

  _parseUrl(url) {
    if (url && !url.startsWith("http")) {
      return "http://" + url;
    } else {
      return url;
    }
  }

  get title() {
    return this._title;
  }

  get link() {
    return this._link;
  }

  get linkName() {
    return this._linkname;
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
