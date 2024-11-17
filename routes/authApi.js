const { Router } = require('express');
const AuthControllers = require('../Controllers/AuthController'); // Adjust the path as needed

const authApiRouter = Router();

authApiRouter.post('/register', AuthControllers.register);
authApiRouter.post('/login', AuthControllers.login);

//authApiRouter.post("/refresh-token", AuthControllers.refreshToken);

module.exports = authApiRouter;
