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
              `select p.project_id         id,
                      p.name,
                      p.symbol,
                      ifnull(pic.count, 0) container_count
               from projects p
                        left outer join (select phd.project_id, count(*) count
                                         from project_has_devices phd
                                                  join containers c on phd.device_id = c.device_id
                                         where c.state = 'running'
                                         group by phd.project_id) as pic using (project_id)
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
  get: function (projectID) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select *
               from projects
               where project_id = ?
               limit 1`, projectID
          );
        })
        .then(result => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            throw Error(`Project Not Found. (project_id: ${projectID})`);
          }
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          releaseConnection(con);
        });
    });
  },
  register: function (name, symbol) {
    return new Promise((resolve, reject) => {
      let con;
      const projectID = crypto.createHash('sha256').update(name + "-" + symbol).digest("hex");

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          if (!symbol.match(new RegExp(`^[A-Za-z0-9]{1,${MAX_SYMBOL_LENGTH}}$`))) throw Error(`symbol is invalid(symbol: ${symbol})`)
        })
        .then(() => con.query(`select count(*) count
                               from projects
                               where project_id = ?`, projectID))
        .then(count => {
          if (count.count > 0) {
            throw Error(`project_id is duplicated(project_id: ${projectID})`);
          }
        })
        .then(() => con.query(
            `insert into projects (project_id, name, symbol) value (?, ?, ?)`, [projectID, name, symbol]))
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