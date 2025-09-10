import express from "express"
import { signUp, login, logOut } from "../controllers/auth.controller.js"



const authRouter = express.Router()

//for signup
authRouter.post("/signup", signUp)

//for login
authRouter.post("/login", login)

//for logout
authRouter.post("/logout", logOut)


export default authRouter
