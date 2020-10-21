const fs = require('fs');
const unidiff = require('unidiff');

const microservices = require('../models/Deployment/Microservices');
const deployments = require('../models/Deployment/Deployments');
const containers = require('../models/Deployment/Containers');

module.exports = {
  getMicroservice: function (req, res, _) {
    const microserviceID = req.params.microservice_id;

    microservices
      .get(microserviceID)
      .then(data => {
        return Promise.all([
          data,
          microservices.readLocalDockerFile(data)
        ])
      })
      .then(data => {
          res.status(200).send({
            ...data[0],
            docker_file_text: data[1],
            diff_text: getPerfectEqualsDiffText(data[1]),
          })
        }
      )
      .catch(err => {
          console.log(err);
          res.status(500).send(err);
        }
      );
  },
  getLatestDeployment: function (req, res, _) {
    const microserviceID = req.params.microservice_id;
    const deviceID = req.params.device_id;

    deployments
      .getLatestDeployment(microserviceID, deviceID)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  getContainer: function (req, res, _) {
    const microserviceID = req.params.microservice_id;
    const deviceID = req.params.device_id;

    containers
      .getByMicroserviceIDAndDeviceID(microserviceID, deviceID)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  createDockerFileDiff: function (req, res, _) {
    try {
      const oldText = req.body.current
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');
      const newText = fs.readFileSync(req.file.path).toString()
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');
      let diffText = unidiff.formatLines(
        unidiff.diffLines(oldText, newText),
        {
          context: 100000, // 一致する行を省略せずに表示するため極端に大きな値を設定
        });
      // 完全一致の場合
      if (diffText === "") {
        diffText = getPerfectEqualsDiffText(newText);
      }
      // publicからの相対パスを返す
      res.status(200).send({
        file_name: '/temp/' + req.file.filename,
        diff_text: diffText,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({err});
    }
  },
};

const getPerfectEqualsDiffText = (text) => {
  const arr = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n').map(s => " " + s);

  // テキスト全体をUnified形式で出力する
  return ["--- a", "+++ b", `@@ -1,${arr.length} +1,${arr.length} @@`, ...arr].join("\n");
};
