const {getConnection, releaseConnection} = require('../../db');
const dateFormat = require('dateformat');

module.exports = {
  insertDeployment: function (deviceID, microserviceID) {
    return new Promise((resolve, reject) => {
      let con;
      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          con.query(`insert into deployments (device_id, microservice_id, release_tag, deployment_date, state)
                     values (?, ?, ?, ?, ?)`,
            [
              deviceID,
              microserviceID,
              "v1.0.0", // TODO dummy
              dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
              0
            ])
        )
        .then(result => {
          con.commit();
          resolve(result.insertId);
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          if (con !== undefined) {
            con.rollback();
          }
          releaseConnection(con);
        });
    });
  },
  getLatestDeployment: function (microserviceID, deviceID) {
    return new Promise((resolve, reject) => {
      let con;
      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          con.query(`select deployment_id,
                            device_id,
                            microservice_id,
                            release_tag,
                            deployment_date,
                            state,
                            error_message
                     from deployments
                     where microservice_id = ?
                       AND device_id = ?
                     order by deployment_date desc
                     limit 1`,
            [microserviceID, deviceID])
        )
        .then(result => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            resolve({});
          }
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          releaseConnection(con);
        });
    });
  }
};