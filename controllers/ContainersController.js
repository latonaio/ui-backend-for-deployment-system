const microservices = require('../models/Deployment/Microservices');
const containers = require('../models/Deployment/Containers');
const status = require('../models/Deployment/Status');

module.exports = {
  fetchContainers: function (req, res, _) {
    microservices
      .fetchByProjectSymbol(req.params.projectSymbol)
      .then(results =>
        Promise.all(
          results.map(
            microservice =>
              Promise.all([
                  microservice,
                  microservices.getReleaseByMicroserviceID(microservice.microservice_id),
                  containers.getByMicroserviceIDAndDeviceID(microservice.microservice_id, req.params.deviceName),
                  status.get(req.params.deviceName, req.params.projectSymbol, microservice.name)
                ]
              )
          )
        ))
      .then(data =>
        data.map(
          row => ({
            microservice: {...row[0], ...row[1]},
            container: row[2],
            deployment: row[3],
          })
        ))
      .then(data => res.status(200).send(data))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};