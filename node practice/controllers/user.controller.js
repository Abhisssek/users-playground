import  User  from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


import { generateAccessToken, generateRefreshToken } from "../token.js"


export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "every field is required", success: false })
        }


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already exist with this email", success: false })

        }

        const hashedPassword = await bcrypt.hash(password, 12)


        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({ message: "User created successfully", success: true, user })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "register controller problem", error })
    }

}



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: "all fields required" })

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "invalid credentials or user not registered" })

        const comparePassword = await bcrypt.compare(
            password, user.password
        )

        if (!comparePassword) return res.status(401).json({ message: "invalid credentials" })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" || "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })


        return res.status(200).json({
            message: "logged in successfully",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "server error in login cnt" })
    }
}




export const refreshTokenGenerate = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken


        // console.log(refreshToken);
        

        if (!refreshToken) return res.status(400).json({ message: "no token found" })

        const decoded = jwt.verify(
            refreshToken,
            process.env.secret_jwt
        )


        // console.log(decoded);
        
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        const newAccessToken = generateAccessToken(user);

        res.status(200).json({
            accessToken: newAccessToken,
        });

    } catch (error) {
        return res.status(500).json({ message: "server error refresh cntr" })
    }
}



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: "server error getAllUsers cntr" })
    }
}


export const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};

