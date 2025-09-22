import jwt from 'jsonwebtoken'

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token) {
            return res.json({success:false, message:"NOT authorized to login again"})
        }
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // Instead of req.body.userId, use req.user
        req.user = { userId: token_decode.id }
        next()
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser
