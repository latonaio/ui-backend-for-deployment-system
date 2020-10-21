const express = require('express');
const app = express();
const Redis = require('ioredis');
const config = require('../../config/db.json')[app.get('env')];

const redis = new Redis({
  "host": config.redis.host,
  "port": config.redis.port,
  "password": config.redis.pass,
  "db": config.redis.index,
});

const EXPIRE_TIME = 10 * 60;

module.exports = {
  insert: function (device_name, project_name, microservice_name, status) {
    return new Promise((resolve, reject) => {
      const hash_key = make_hash_key(device_name, project_name, microservice_name);
      const hash = {
        "status": status,
        "error": "",
        "updated_by": "",
        "updated_at": ""
      }

      redis.hmset(hash_key, hash)
        .then(_ => redis.expire(hash_key, EXPIRE_TIME))
        .then(ret => {
          console.log("write deployment status to redis: " + hash_key)
          resolve(ret);
        })
        .catch(error => {
          console.log(error)
          reject(error);
        })
    });
  },
  get: function (device_name, project_name, microservice_name) {
    return new Promise((resolve, reject) => {
      const hash_key = make_hash_key(device_name, project_name, microservice_name);
      redis.hgetall(hash_key)
        .then(value => resolve(value))
        .catch(error => {
          console.log(error);
          reject(error);
        })
    });
  },
  STATUS_DEPLOY_RUNNING: "0",
  STATUS_DEPLOY_SENDING: "1",
  STATUS_DELETE_RUNNING: "800",
  STATUS_DELETE_SENDING: "801",
};

function make_hash_key(device_name, project_name, microservice_name) {
  return device_name + "," + project_name + "," + microservice_name;
}
