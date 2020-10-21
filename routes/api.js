const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');
const VerifyToken = require('../middlewares/verifyToken');
const path = require('path');
const multer = require('multer');
const dateFormat = require('dateformat');
const app = express();

const domain = require('express-domain-middleware');
app.use(domain);
// exception handlers(for debug)
app.use(function (err, req, res, _) {
  console.log(err);
  res.send(500, "Error");
});

const userController = require('../controllers/UserController');
const projectsController = require('../controllers/ProjectsController');
const deviceController = require('../controllers/DevicesController');
const microserviceController = require('../controllers/MicroservicesController');
const containerController = require('../controllers/ContainersController');
const deploymentController = require('../controllers/DeploymentController');
const runtimeController = require('../controllers/RuntimeController');
const podController = require('../controllers/PodController');

//configファイルから環境に応じた内容を取得
router.post('/auth/verifyAuthUserByEmail', [
  check('email').isLength({min: 1}),
  check('password').isLength({min: 5})
], userController.authenticate);
router.get('/me', VerifyToken, userController.me);

// projects
router.get('/project/get/:projectSymbol', projectsController.get);
router.get('/project/fetch', projectsController.fetch);
router.post('/project/create', projectsController.upsert);

// devices
router.get('/device/fetch', deviceController.fetchDevices);
router.get('/device/get/:deviceName', deviceController.getDevice);

// microservices
router.get('/microservices/fetch/microservices/:projectSymbol', microserviceController.fetchMicroservices);
router.get('/microservices/fetch/versions/:projectSymbol', microserviceController.fetchReleaseVersions);
router.get('/microservices/fetch/not-deployed-microservices/:projectSymbol', microserviceController.fetchNotDeployedMicroservices);
router.post('/microservices/add', microserviceController.addMicroservice);
router.post('/microservices/remove', microserviceController.removeMicroservice);

// devices
router.get('/containers/fetch/containers/:projectSymbol/:deviceName', containerController.fetchContainers);

// deployment
router.get('/deployment/get/microservice/:microservice_id', deploymentController.getMicroservice);
router.get('/deployment/get/deployment/:microservice_id/:device_id', deploymentController.getLatestDeployment);
router.get('/deployment/get/container/:microservice_id/:device_id', deploymentController.getContainer);
router.post('/deployment/deployToKubernetes', runtimeController.execDeployToKubernetes);
router.post('/deployment/deleteFromKubernetes', runtimeController.execDeleteFromKubernetes);

// pod
router.get('/pod/fetch/:projectSymbol/:deviceName', podController.fetchPods);

// file upload
// TODO tempディレクトリを定数で保持
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const constants = require('../constants/directory.constants');
    cb(null, path.join(constants.publicDir, "temp"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + dateFormat(new Date(), "yyyymmddHHMMssl") + path.extname(file.originalname));
  }
});
const upload = multer({storage: storage});

// file
// upload.singleの引数はリクエストのファイルを格納しているキー名と合わせること
router.post('/file/upload/dockerfile', upload.single('dockerfile'),
  deploymentController.createDockerFileDiff);

module.exports = router;
