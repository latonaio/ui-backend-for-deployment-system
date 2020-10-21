const {getConnection, releaseConnection} = require('../../db');

module.exports = {
  getByMicroserviceIDAndDeviceID: function (microserviceID, deviceID) {
    return new Promise((resolve, reject) => {
      let con;
      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          con.query(`select *
                     from containers c
                     where microservice_id = ?
                       AND device_id = ?
                     limit 1`,
            [microserviceID, deviceID])
        )
        .then(result => {
          resolve(result);
          s
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          releaseConnection(con);
        });
    });
  }
};