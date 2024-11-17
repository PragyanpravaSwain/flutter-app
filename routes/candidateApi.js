const { Router } = require("express");
const { CandidateController, upload } = require("../Controllers/CandidateController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const candidateApiRouter = Router();

candidateApiRouter.post(
    "/create",
    AuthMiddleware(["ADMIN"]),
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "resume", maxCount: 1 },
    ]),
    CandidateController.uploadCandidateDetails
);

candidateApiRouter.get("/all", CandidateController.getAllCandidates);

module.exports = candidateApiRouter;
