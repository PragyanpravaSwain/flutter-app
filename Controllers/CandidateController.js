const multer = require("multer");
const path = require("path");
const prisma = require("../DB/db.config");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === "image" ? "public/image" : "public/resume";
        cb(null, path.join(__dirname, "../", folder));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

class CandidateController {

    static async uploadCandidateDetails(req, res) {
        const { name, email, contact, education, role } = req.body;

        if (!req.files || !req.files.image || !req.files.resume) {
            return res.status(400).json({ message: "Image and resume files are required." });
        }

        try {
            const existingCandidate = await prisma.candidate.findUnique({
                where: { email },
            });

            if (existingCandidate) {
                return res.status(409).json({ message: `Candidate already exists with email: ${email}` });
            }

            const imagePath = `/image/${req.files.image[0].filename}`;
            const resumePath = `/resume/${req.files.resume[0].filename}`;

            const candidate = await prisma.candidate.create({
                data: {
                    name,
                    email,
                    contact,
                    education,
                    role,
                    image: imagePath,
                    resume: resumePath,
                },
            });

            res.status(201).json(candidate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to upload candidate details." });
        }
    }

    static async getAllCandidates(req, res) {
        try {
            const candidates = await prisma.candidate.findMany();

            if (!candidates || candidates.length === 0) {
                return res.status(404).json({ message: "No candidates found." });
            }

            res.status(200).json(candidates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve candidates." });
        }
    }
}

module.exports = {
    upload: multer(),
    CandidateController
};
