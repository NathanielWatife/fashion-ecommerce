const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = new User({
            name, 
            email, 
            password
        });
        await user.save();
        res.status(201).json({
            message: 'User register successfully'
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.loginUSer = async (req, res) => {
    try {
        const {
            email, 
            password
        } = req.body;
        const user = await User.findOne(
            {
                email
            }
        );
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json(
                {
                    message: 'Invalid Credentials'
                }
            );
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1hr'});
        res.json(
            {
                token, 
                user:{
                    id:user._id, 
                    name: user.name, 
                    isAdmin: user.isAdmin
                }
            }
        );
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};