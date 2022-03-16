const fs = require("fs");

class File {
  static fileExists(path) {
    return new Promise((resolve, reject) => {
      fs.access(`./${path}`, (err) => {
        console.log({});
        if (err) {
          reject(err);
        }

        resolve(true);
      });
    });
  }

  static readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(`./${path}`, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data.toString());
      });
    });
  }

  static writeFile(path, text) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`./${path}`, text, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }

  static appendFile(path, text) {
    return new Promise((resolve, reject) => {
      fs.appendFile(`./${path}`, text, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }

  static readDir(path) {
    return new Promise((resolve, reject) => {
      fs.readDir(`./${path}`, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }

  static deleteFile(path) {
    return new Promise((resolve, reject) => {
      fs.rm(`./${path}`, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(true);
      });
    });
  }
}

module.exports = File;
