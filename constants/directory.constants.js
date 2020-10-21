const userName = process.env.USER;
const deviceName = process.env.DEVICE_NAME;

module.exports = {
  deviceName: deviceName,
  runtimeDir: `/home/${userName}/${deviceName}/Runtime`,
  publicDir: `/home/${userName}/${deviceName}/UI/ui-backend-for-deployment-system/public`,
  jsonOutputDir: process.env.JSON_OUTPUT_DIR || `/var/lib/aion/Data/direct-next-service_1/`,
  deploymentJsonDir: process.env.DEPLOYMENT_JSON_DIR || `/var/lib/aion/Data/deployment/aion-deployment-json/`,
};
