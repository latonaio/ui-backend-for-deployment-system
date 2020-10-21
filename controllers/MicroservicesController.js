const microservices = require('../models/Deployment/Microservices');
// const devices = require('../models/ServiceBroker/Devices');
const devices = require('../models/Device/Device');

module.exports = {
  fetchMicroservices: function (req, res, _) {
    const projectSymbol = req.params.projectSymbol;

    microservices
      .fetchByProjectSymbol(projectSymbol)
      .then(results =>
        Promise.all(
          results.map(
            result => (
              Promise.all([
                result,
                microservices.getReleaseByMicroserviceID(result.microservice_id),
                microservices.isRemovableMicroservice(projectSymbol, result.name),
              ]))
          )
        )
      )
      .then(data => data.map(d => ({...d[0], ...d[1], ...d[2]})))
      .then(data => {
          res.status(200).send(data)
        }
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  fetchDevices: function (req, res, _) {
    devices
      .fetchAll()
      .then(data => {
          res.status(200).send(data)
        }
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  fetchReleaseVersions: function (req, res, _) {
    const projectSymbol = req.params.projectSymbol;

    microservices.fetchReleaseVersions(projectSymbol)
      .then(data => {
          res.status(200).send(data)
        }
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  fetchNotDeployedMicroservices: function (req, res, _) {
    const projectSymbol = req.params.projectSymbol;

    microservices.fetchNotDeployedMicroservices(projectSymbol)
      .then(data =>
        res.status(200).send(data)
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
  },
  addMicroservice: function (req, res, _) {
    const projectSymbol = req.body.projectSymbol;
    const microserviceName = req.body.microserviceName;

    microservices.addMicroserviceToProject(projectSymbol, microserviceName)
      .then(_ => Promise.all([
        microservices.fetchByProjectSymbol(projectSymbol),
        microservices.fetchNotDeployedMicroservices(projectSymbol),
      ]))
      .then(data =>
        Promise.all([
          Promise.all(
            data[0].map(microservice =>
              Promise.all(
                [
                  microservice,
                  microservices.getReleaseByMicroserviceID(microservice.microservice_id),
                  microservices.isRemovableMicroservice(projectSymbol, microservice.name),
                ]
              )
            )
          ),
          data[1],
        ]))
      .then(data => [
        data[0].map(microservice => ({...microservice[0], ...microservice[1], ...microservice[2]})),
        data[1],
      ])
      .then(data => res.status(200).send({
        microservices: data[0],
        notDeployedMicroservices: data[1],
      }))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  removeMicroservice: function (req, res, _) {
    const projectSymbol = req.body.projectSymbol;
    const microserviceName = req.body.microserviceName;

    microservices.removeMicroserviceFromProject(projectSymbol, microserviceName)
      .then(_ => Promise.all([
        microservices.fetchByProjectSymbol(projectSymbol),
        microservices.fetchNotDeployedMicroservices(projectSymbol),
      ]))
      .then(data =>
        Promise.all([
          Promise.all(
            data[0].map(microservice =>
              Promise.all(
                [
                  microservice,
                  microservices.getReleaseByMicroserviceID(microservice.microservice_id),
                  microservices.isRemovableMicroservice(projectSymbol, microservice.name),
                ]
              )
            )
          ),
          data[1],
        ]))
      .then(data => [
        data[0].map(microservice => ({...microservice[0], ...microservice[1], ...microservice[2]})),
        data[1],
      ])
      .then(data => res.status(200).send({
        microservices: data[0],
        notDeployedMicroservices: data[1],
      }))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
};