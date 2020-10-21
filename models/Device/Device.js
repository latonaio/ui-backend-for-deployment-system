const {getConnection, releaseConnection} = require('../../db');

module.exports = {
  get: function (deviceName) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select *
               from Device.device
               where deviceName = ?
               limit 1`, deviceName
          );
        })
        .then(result => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            throw Error(`Device Not Found. (device_id: ${deviceName})`);
          }
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          releaseConnection(con);
        });
    });
  },
  fetchAll: function () {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select d.deviceName,
                      d.projectSymbolFk,
                      d.deviceIp,
                      d.connectionStatus,
                      d.os,
                      p.projectSymbol,
                      p.projectName,
                      p.projectID,
                      p.timestamp
               from Device.device d
                        left outer join Project.project p on p.projectSymbol = d.projectSymbolFk`
          );
        })
        .then(result => {
          resolve(result);
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          releaseConnection(con);
        });
    });
  },
};