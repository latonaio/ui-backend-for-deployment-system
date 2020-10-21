const devices = require('../models/Device/Device');
const pods = require('../models/Pod/Pod');

const status = require('../models/Deployment/Status');

module.exports = {
  fetchPods: function (req, res, _) {
    pods.fetchByDeviceName(req.params.projectSymbol, req.params.deviceName)
      .then(data =>
        Promise.all(
          data.map(
            pod =>
              Promise.all([
                pod,
                devices.get(req.params.deviceName)
                  .then(device => status.get(device.deviceName, req.params.projectSymbol, pod.microserviceName))
              ]))))
      .then(data =>
        res.status(200).send(
          data.map(d =>
            ({...d[0], deployment: d[1]})
          )
        )
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
};