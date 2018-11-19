var express = require('express');
var router = express.Router();
var cmsCtrl = require('../controllers/cms.controller');

router.post('/addcms',cmsCtrl.addCms);
router.get('/getallcms',cmsCtrl.getAllCms);
router.delete('/:id',cmsCtrl.deleteCms);
router.put('/:id',cmsCtrl.updateCms);
router.get('/:id',cmsCtrl.specificCms);

module.exports = router;