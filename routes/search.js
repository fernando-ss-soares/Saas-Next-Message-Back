import express from "express";
import User from "../model/user.js";
import validToken from "../auth/auth.js"; 

const router = express.Router();

router.get('/', validToken, async (req, res) => {
    
    const Users = await User.find({});

    try {
        return res.status(200).json({
            'Message' : {
                'Users' : Users
            }
        })
    } catch (error) {
        return res.status(500).json({
            'Server Error': error
        })
    }

})

export default router;