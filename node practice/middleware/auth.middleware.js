import jwt from "jsonwebtoken"

export const isAuth = (req, res, next)=>{
    try {
       const authHeader = req.headers.authorization
    //    console.log(authHeader);
       
       if(!authHeader) return res.status(400).json({message: "access token not found"})

        

        const token = authHeader.split(" ")[1]


        // console.log(token);
        

        const decoded = jwt.verify(token, process.env.secret_jwt)

        req.user = decoded
        next()
        
    } catch (error) {
       console.log(error);
        
    }
}