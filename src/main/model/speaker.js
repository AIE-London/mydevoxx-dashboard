/**
 * Created by dan on 03/05/2017.
 */
export default class Speaker {
  _uuid;
  _bio;
  _acceptedTalkIDs;
  _company;
  _lastName;
  _firstName;
  _blog;
  _avatarURL;
  _twitter;

  constructor(
    uuid,
    bio,
    acceptedTalkIDs,
    company,
    lastName,
    firstName,
    blog,
    avatarURL,
    twitter
  ) {
    this._uuid = uuid;
    this._bio = bio;
    this._acceptedTalkIDs = acceptedTalkIDs;
    this._company = company;
    this._lastName = lastName;
    this._firstName = firstName;
    this._blog = blog;
    this._avatarURL = avatarURL;
    this._twitter = twitter;
  }
  uuid() {
    return this._uuid;
  }
  bio() {
    return this._bio;
  }
  acceptedTalkIDs() {
    return this._acceptedTalkIDs;
  }
  company() {
    return this._company;
  }
  name() {
    return this._firstName + " " + this._lastName;
  }
  blog() {
    return this._blog;
  }
  avatarURL() {
    return this._avatarURL;
  }
  twitter() {
    return this._twitter;
  }
}
