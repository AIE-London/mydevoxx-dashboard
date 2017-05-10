/**
 * Created by dan on 10/05/2017.
 */

import Dexie from "dexie";

let db;

function init() {
  //Define indexeddb instance/version
  db = new Dexie("devoxx-db");
  db.version(1).stores({ record: "id,uuid" });
}

function storeUUID(uuid) {
  return db.record.put({ id: "0", uuid: uuid });
}

function clear() {
  return db.record.clear();
}

function getUUID() {
  return new Promise((resolve, reject) => {
    //open connection to indexeddb - display error if connection failed
    db.record &&
      db.record.get("0").then(resolution => {
        if (resolution) {
          resolve(resolution);
        } else {
          throw new Error("No UUID");
        }
      });
  });
}

function openDB() {
  return db.open("devoxx-db");
}

export default {
  openDB,
  getUUID,
  clear,
  storeUUID,
  init
};
