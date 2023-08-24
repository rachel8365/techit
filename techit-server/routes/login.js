const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const joi = require("joi")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
})

router.post("/", async (req, res) => {
    try {
        // 1. joi validation
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        // 2. check if user already exist
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Wrong email or password");

        // 3. compare the password
        let result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send("Wrong email or password");

        // 4. create the token
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin, email: user.email },
            process.env.jwtKey
        );

        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router