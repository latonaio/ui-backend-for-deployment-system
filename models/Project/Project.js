const {getConnection, releaseConnection} = require('../../db');
const crypto = require('crypto');

const MAX_SYMBOL_LENGTH = 7;

module.exports = {
  fetch: function () {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select p.projectID,
                      p.projectName,
                      p.projectSymbol,
                      ifnull(poc.count, 0) podCount,
                      ifnull(dc.count, 0)  deviceCount
               from Project.project p
                        left outer join (
                   select p2.projectSymbol, count(*) count
                   from Project.project p2
                            join Device.device d on p2.projectSymbol = d.projectSymbolFk
                            join Pod.pod po on d.deviceName = po.deviceNameFk
                   where po.status = 0
                   group by p2.projectSymbol) as poc
                                        using (projectSymbol)
                        left outer join (
                   select d.projectSymbolFk, count(*) count
                   from Device.device d
                   group by d.projectSymbolFk) as dc on dc.projectSymbolFk = p.projectSymbol
               order by timestamp`
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
  get: function (projectSymbol) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select *
               from Project.project
               where projectSymbol = ?
               limit 1`, projectSymbol
          );
        })
        .then(result => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            throw Error(`Project Not Found. (projectSymbol: ${projectSymbol})`);
          }
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          releaseConnection(con);
        });
    });
  },
  upsert: function (projectName, projectSymbol, targetProjectSymbol) {
    return new Promise((resolve, reject) => {
      let con;
      const projectID = crypto.createHash('sha256')
        .update(projectSymbol).digest("hex");

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          if (!projectSymbol.match(new RegExp(`^[A-Za-z0-9]{1,${MAX_SYMBOL_LENGTH}}$`))) throw Error(`symbol is invalid format(symbol: ${projectSymbol})`)
        })
        .then(() => {
          if (projectSymbol === 'default') throw Error(`symbol is invalid value(symbol: ${projectSymbol})`)
        })
        .then(() => con.query(`select count(*) count
                               from Project.project
                               where projectSymbol = ?`, projectSymbol))
        .then(count => {
          if (count.count > 0) {
            throw Error(`projectSymbol is duplicated(projectSymbol: ${projectSymbol})`);
          }
        })
        .then(() => {
          if (targetProjectSymbol === null) {
            return con.query(
                `insert into Project.project (projectName, projectSymbol, projectID) value (?, ?, ?)`,
              [projectName, projectSymbol, projectID])
          } else {
            return con.query(
                `update Project.project
                 set projectName = ?
                 where projectSymbol = ?`,
              [projectName, targetProjectSymbol])
          }
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