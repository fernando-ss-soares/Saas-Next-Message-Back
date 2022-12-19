import express from "express";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.get('/', async (req, res) => {

    const { email, password } = req.body

    if(!email) {
        return res.status(406).json({
            'Alert': 'field email it is in blank'
        })
    }

    if(!password) {
        return res.status(406).json({
            'Alert': 'field password it is in blank'
        })
    }

    const user = await User.findOne({ next_email: email })

    console.log(user)

    if(user == null) {
        return res.status(406).json({
            'Alert': 'not found user'
        })
    }

    const check_password = await bcrypt.compare(password, user?.next_password);

    if(!check_password) {
        return res.status(401).json({
            'Message': 'user or password invalid'
        })
    }

    try {
        
        const secret = process.env.SECRET_KEY
        
        const token = jwt.sign({
            id: user._id
        }, secret)

        return res.status(200).json({
            'Message': {
                'User': {
                    next_name: user?.next_name,
                    next_lastname: user?.next_lastname,
                    next_email: user?.next_email
                },
                'Auth': 'user authenticated',
                'Token': token
            } 
        })

    } catch (error) {
        return res.status(500).json({
            'Server Error': error
        })
    }

})

router.post('/', async (req, res) => {

    const { name, lastname, email, password } = req.body

    if(!name) {
        return res.status(406).json({
            'Alert': 'field email it is in blank'
        })
    }

    if(!lastname) {
        return res.status(406).json({
            'Alert': 'field email it is in blank'
        })
    }

    if(!email) {
        return res.status(406).json({
            'Alert': 'field email it is in blank'
        })
    }

    if(!password) {
        return res.status(406).json({
            'Alert': 'field email it is in blank'
        })
    }

    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);

    const user = {
        next_name: name,
        next_lastname: lastname,
        next_email: email,
        next_password: password_hash
    }

    try {

        const consulta_usuario_banco = await User.findOne({ next_email: email });

        if (Boolean(consulta_usuario_banco) == true) {
            return res.status(200).json({
                'Message':'User already it is register'
            });
        } else {
            await User.create(user);
            return res.status(200).json({
                'Message':'User register with success'
            });   
        }

        
    } catch (error) {
        return res.status(500).json({
            'Error': error
        });
    }

})

export default router