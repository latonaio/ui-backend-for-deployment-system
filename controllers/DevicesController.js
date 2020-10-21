const devices = require('../models/Device/Device');

module.exports = {
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
  getDevice: function (req, res, _) {
    devices.get(req.params.deviceName)
      .then(data => {
          res.status(200).send(data)
        }
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
};