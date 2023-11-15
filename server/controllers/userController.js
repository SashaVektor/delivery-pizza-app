import User from "../models/userModel.js"
import expressAsyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import { generateToken } from "../utils.js"
import generatePassword from "generate-password"

export const signIn = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                })
                return;
            }
        }
        res.status(401).send({ message: "Invalid email or password" })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

export const signUp = expressAsyncHandler(async (req, res) => {
    try {
        const person = await User.findOne({ email: req.body.email })

        if (person) {
            throw new Error("User already exist")
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
        })

        const user = await newUser.save();

        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        })
    } catch (err) {
        res.status(401).send({ message: err.message })
    }
})

export const googleUserSignIn = expressAsyncHandler(async (req, res) => {
    try {
        const person = await User.findOne({ email: req.body.email })

        if (person) {
            res.send({
                _id: person._id,
                name: person.name,
                email: person.email,
                isAdmin: person.isAdmin,
                token: generateToken(person)
            })
            return
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);

        const password = generatePassword.generate({
            length: 16, 
            numbers: true, 
            symbols: true,
            uppercase: true,
            excludeSimilarCharacters: true,
          });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        })

        const user = await newUser.save();

        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        })

    } catch (err) {
        res.status(401).send({ message: err.message })
    }
})


export const getAllUsers = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

