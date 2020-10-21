const fs = require('fs');
const dateFormat = require('dateformat');

const path = require('path');
const directoryConstants = require('../constants/directory.constants');
const deviceConstants = require('../constants/device.constants');
const status = require('../models/Deployment/Status');

const devices = require('../models/Device/Device');

const jsonSuffix = "-aion-deployment.json"

const STATE = {
  default: {
    running: status.STATUS_DEPLOY_RUNNING,
    sending: status.STATUS_DEPLOY_SENDING,
  },
  delete: {
    running: status.STATUS_DELETE_RUNNING,
    sending: status.STATUS_DELETE_SENDING,
  }
}

module.exports = {
  execDeployToKubernetes: function (req, res, _) {
    const deviceName = req.body.deviceName;
    const projectSymbol = req.body.projectSymbol;
    const microserviceName = req.body.microserviceName;

    sendToKubernetes(deviceName, projectSymbol, microserviceName, "default")
      .then(() => res.status(200).send(true))
      .catch(err => {
          console.log(err);
          res.status(500).send(err);
        }
      );
  },
  execDeleteFromKubernetes: function (req, res, _) {
    const deviceName = req.body.deviceName;
    const projectSymbol = req.body.projectSymbol;
    const microserviceName = req.body.microserviceName;

    sendToKubernetes(deviceName, projectSymbol, microserviceName, "delete")
      .then(() => res.status(200).send(true))
      .catch(err => {
          console.log(err);
          res.status(500).send(err);
        }
      );
  },
};

const sendToKubernetes = (deviceName, projectSymbol, microserviceName, type) =>
  new Promise((resolve, reject) => {
      const now = new Date();
      // TODO プロジェクトリポジトリのコミットID
      const projectCommitID = "9354fe20655cd15729f3448f9a98c3b2026d485b";

      const myDockerRegistryPort = deviceConstants.port;
      const myDeviceName = deviceConstants.deviceName;

      devices.get(deviceConstants.deviceName)
        .then((myDevice) => {
            const jsonPath = path.join(directoryConstants.deploymentJsonDir, (microserviceName.replace(/-/g, '') + jsonSuffix));
            const deployJsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

            const execMetadata = {
              deviceName: deviceName,
              projectName: projectSymbol,
              microserviceName: microserviceName,
              projectCommitId: projectCommitID,
              dockerTag: 'latest', // TODO タグ名
              ip: myDevice.deviceIp,
              port: myDockerRegistryPort,
              priorDeviceName: myDeviceName,
            };

            const metadata = {
              connections: {
                [type]: {
                  deviceName: deviceName,
                  outputDataPath: path.join("/var/lib/aion/Data", microserviceName + "_1"),
                  metadata: {
                    ...deployJsonData['connections']['default']['metadata'],
                    ...execMetadata,
                  },
                },
                status: {
                  outputDataPath: path.join("/var/lib/aion/Data/get-response-of-container-deployment_1"),
                  metadata: {
                    deviceName: deviceName,
                    projectName: projectSymbol,
                    microserviceName: microserviceName,
                    projectCommitId: projectCommitID,
                    status: STATE[type].sending,
                    error: "",
                  }
                },
              },
            }

            return outputJsonFile(metadata, type, now);
          }
        )
        .then(() => resolve(status.insert(deviceName, projectSymbol, microserviceName, STATE[type].running)))
        .catch(e => reject(e));
    }
  )


const outputJsonFile = (data, prefix, now) => {
  if (now === undefined) {
    now = new Date();
  }
  const outputPath = directoryConstants.jsonOutputDir + '/'
    + prefix + '_' + dateFormat(now, "yyyymmddHHMMssl") + '.json';

  try {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 4));
    console.log("Successfully Written to " + outputPath);
    return outputPath;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
