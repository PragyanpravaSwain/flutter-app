const vine = require("vine");

const candidateValidationSchema = vine.compile({
    name: vine.string().required(),
    email: vine.string().email().required(),
    contact: vine.string().required(),
    education: vine.string().required(),
    role: vine.string().required(),
    image: vine.object().required(),
    resume: vine.object().required(),
});

module.exports = { candidateValidationSchema };
