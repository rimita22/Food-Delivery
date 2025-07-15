// import jwt from "jsonwebtoken"

// const authMiddleware = async (req,res,next) => {
//     const { token } = req.headers;
//     if(!token) {
//         return res.json({sucess:false,message:"Not Authorized Login Again"})
//     }
//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // support both `token` header or `Authorization: Bearer <token>`
    let token = req.headers.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    console.log("Incoming Headers:", req.headers);
    console.log("Extracted token:", token);

    if (!token) {
        console.warn("No token provided in headers");
        return res.json({ success: false, message: "Not Authorized. Please login again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT payload:", decoded);

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.json({ success: false, message: "Invalid token, please login again." });
    }
};

export default authMiddleware;
