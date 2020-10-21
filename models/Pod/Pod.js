const {getConnection, releaseConnection} = require('../../db');

module.exports = {
  fetchByDeviceName: function (projectSymbol, deviceName) {
    return new Promise((resolve, reject) => {
      let con;

      getConnection()
        .then(connection =>
          con = connection
        )
        .then(() => {
          return con.query(
              `select m.name microserviceName,
                      pr.projectSymbol,
                      p.podName,
                      p.imageName,
                      p.deviceNameFk,
                      p.currentVersion,
                      p.latestVersion,
                      p.deployedAt,
                      p.status
               from Project.project pr
                        join Project.projectHasMicroservice phm on phm.projectSymbol = pr.projectSymbol
                        join Deployment.microservices m on phm.microserviceName = m.name
                        left outer join
                    (select *
                     from Pod.pod p
                              join (select MAX(deployedAt) dep, imageName im, deviceNameFk dev
                                    from Pod.pod
                                    group by imageName, deviceNameFk) p2
                                   on p2.dep = p.deployedAt
                                       and p2.im = p.imageName
                                       and p2.dev = p.deviceNameFk) p
                    on p.imageName like concat('%',phm.microserviceName,'%') and p.deviceNameFk = ?
               where pr.projectSymbol = ?
               order by phm.microserviceName`,
            [deviceName, projectSymbol]
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
