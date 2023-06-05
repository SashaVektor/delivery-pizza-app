import express from "express"
import { getAllUsers, signIn, signUp, googleUserSignIn } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post('/signin', signIn)

userRouter.post('/signup', signUp)

userRouter.get("/", getAllUsers)

userRouter.post("/googleUsers/signin", googleUserSignIn)


export default userRouter