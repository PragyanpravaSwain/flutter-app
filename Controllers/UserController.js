const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../DB/db.config");

const register = async (req, res) => {
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

    res.status(201).send(user);
};

module.exports = { register };