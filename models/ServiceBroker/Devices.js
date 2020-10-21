const {getConnection, releaseConnection} = require('../../db');

//configファイルから環境に応じた内容を取得

module.exports = {
  get: function (deviceID) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select *
               from ServiceBroker.devices
               where device_id = ?
               limit 1`, deviceID
          );
        })
        .then(result => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            throw Error(`Device Not Found. (device_id: ${deviceID})`);
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
              `select d.device_id,
                      d.device_symbol,
                      d.host_address
               from ServiceBroker.devices d
                        join project_has_devices phd on d.device_id = phd.device_id`
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
  fetchByProjectID: function (projectID) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select d.device_id,
                      d.device_symbol,
                      d.host_address
               from ServiceBroker.devices d
                        join project_has_devices phd on d.device_id = phd.device_id
               where project_id = ?`,
            projectID
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
  getLocal: function (deviceSymbol) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select *
               from ServiceBroker.devices
               where device_symbol = ?
               limit 1`, deviceSymbol
          );
        })
        .then(result => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            throw Error(`Device Not Found. (device_symbol: ${deviceSymbol})`);
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