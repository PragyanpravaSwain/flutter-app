const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../DB/db.config");

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, role } = req.body;

            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: role || 'USER',
                },
            });

            res.status(201).json(user);
        } catch (error) {
            console.error("Error in register:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(400).json({ error: "User not found." });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ error: "Invalid credentials." });
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            res.json({ token });
        } catch (error) {
            console.error("Error in login:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = AuthController;
