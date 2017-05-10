/**
 * Created by DLINDSAY on 09-May-17.
 */

let log = text => {
  if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
    console.log(text);
  }
};

export default {
  log: log
};
