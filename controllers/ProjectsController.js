const projects = require('../models/Project/Project');

module.exports = {
  fetch: function (req, res, _) {
    projects.fetch()
      .then(data => {
          res.status(200).send(data)
        }
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  get: function (req, res, _) {
    projects.get(req.params.projectSymbol)
      .then(data => {
          res.status(200).send(data)
        }
      )
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  upsert: function (req, res, _) {
    projects.upsert(req.body.name, req.body.symbol, req.body.target)
      .then(_ => projects.fetch())
      .then(data => res.status(200).send(data))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};