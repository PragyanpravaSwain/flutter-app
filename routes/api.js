const { Router } = require('express');
const authApi = require('./authApi.js');
const candidateApi = require('./candidateApi.js');

const router = Router();

router.use("/auth", authApi);
router.use("/candidates", candidateApi);

module.exports = router;
