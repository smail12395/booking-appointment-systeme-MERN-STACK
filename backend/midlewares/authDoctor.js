import jwt from 'jsonwebtoken'

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const {dtoken} = req.headers
        if(!dtoken) {
            return res.json({success:false, message:"NOT authorized to login again"})
        }
        
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        // Instead of req.body.userId, use req.user
        req.doctor = { docId: token_decode.id }
        next()
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authDoctor
