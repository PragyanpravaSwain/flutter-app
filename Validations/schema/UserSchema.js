const vine = require("vine");

const registerUserSchema = vine.compile({
    email: vine.string().email().required(),
    password: vine.string().min(6).required(),
    role: vine.enum("ADMIN", "USER").default("USER"),
});

module.exports = { registerUserSchema };
