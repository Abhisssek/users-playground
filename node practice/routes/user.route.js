import express from "express"
import { register, loginUser, refreshTokenGenerate, logout, getAllUsers, fetchMe } from "../controllers/user.controller.js"
import { isAuth } from "../middleware/auth.middleware.js";

const router = express.Router()



router.post("/register", register);

router.post("/login", loginUser);

router.post("/refresh", refreshTokenGenerate);

router.post("/logout", logout )

router.get("/users", getAllUsers)

router.get("/check-me", isAuth, fetchMe);

router.get("/prof",isAuth ,(req,res)=>{
    res.status(200).json({message: "hello"})
})


export default router