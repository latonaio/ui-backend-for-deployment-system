const fs = require('fs');
const path = require('path');
const {getConnection, releaseConnection} = require('../../db');

const isRemovableQuery = `select not exists(
        select *
        from Pod.pod p
                 join Device.device d on p.deviceNameFk = d.deviceName
        where d.projectSymbolFk = ?
          and p.imageName = ?
    ) isRemovable`;

// TODO ServiceBroker.microserviceに移行する
module.exports = {
  get: function (microserviceID) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select m.*
               from Deployment.microservices m
               where microservice_id = ?
               limit 1`, microserviceID
          );
        })
        .then(result => {
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            throw Error(`Microservice Not Found. (microservice_id: ${microserviceID})`);
          }
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          releaseConnection(con);
        });
    });
  },
  fetchByProjectSymbol: function (projectSymbol) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          con.query(
              `SELECT m.*
               FROM Deployment.microservices m
                        JOIN Project.projectHasMicroservice phm
                             on m.name = phm.microserviceName
               where phm.projectSymbol = ?
               order by phm.timestamp`, projectSymbol
          )
        )
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
  getReleaseByMicroserviceID: function (microserviceID) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          con.query(
              `SELECT mt.*
               FROM Deployment.microservices m
                        left outer join Deployment.microservice_tags mt
                                        on m.microservice_id = mt.microservice_id
               where m.microservice_id = ?
               order by mt.timestamp desc
               limit 1`,
            microserviceID
          )
        )
        .then(result => result.length > 0 ? result[0] : {})
        .then(result => ({
          latest: result.tag,
          release_date: result.timestamp,
        }))
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
  readLocalDockerFile: function (microservice) {
    return new Promise((resolve, reject) => {
      try {
        const dockerFilePath = path.join(microservice.path, "Dockerfile");
        if (fs.existsSync(dockerFilePath)) {
          resolve(fs.readFileSync(dockerFilePath).toString());
        } else {
          resolve("")
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  fetchNotDeployedMicroservices: function (projectSymbol) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          con.query(
              `SELECT m.*
               FROM Deployment.microservices m
               where m.name NOT IN
                     (SELECT phm.microserviceName from Project.projectHasMicroservice phm where phm.projectSymbol = ?)
               order by m.timestamp`,
            projectSymbol
          )
        )
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
  addMicroserviceToProject: function (projectSymbol, microserviceName) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          con.query(
              `select count(*) count
               from Project.projectHasMicroservice phm
               where phm.projectSymbol = ?
                 and microserviceName = ?`,
            [projectSymbol, microserviceName]
          )
        )
        .then(count => {
          if (count.count > 0) {
            return {}; // 何もしない
          } else {
            return con.query(`insert into Project.projectHasMicroservice (projectSymbol, microserviceName) value (?, ?)`,
              [projectSymbol, microserviceName]
            )
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
  removeMicroserviceFromProject: function (projectSymbol, microserviceName) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          Promise.all([
            con.query(
                `select count(*) count
                 from Project.projectHasMicroservice phm
                 where phm.projectSymbol = ?
                   and microserviceName = ?`,
              [projectSymbol, microserviceName]
            ),
            con.query(isRemovableQuery, [projectSymbol, microserviceName])
          ])
        )
        .then(count => {
          if (count.count < 1) {
            return {}; // 何もしない
          } else {
            return con.query(
                `delete
                 from Project.projectHasMicroservice
                 where projectSymbol = ?
                   and microserviceName = ?`,
              [projectSymbol, microserviceName]
            )
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
  isRemovableMicroservice: function (projectSymbol, microserviceName) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() =>
          con.query(isRemovableQuery, [projectSymbol, microserviceName])
        )
        .then(result => {
          resolve(result[0]);
          releaseConnection(con);
        })
        .catch(error => {
          reject(error);
          releaseConnection(con);
        });
    });
  }
};