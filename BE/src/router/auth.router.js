// const express = require('express');
// const bcrypt = require('bcrypt');   
// const jwt = require('jsonwebtoken');
// const knex = require('../database/knex'); 
// const adminController = require('../controllers/admin.controller');


// const router = express.Router();

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try{
//         // Check if username exists in database
//         const admin = await knex('useradmin')
//             .where({ad_username: username})
//             .first();

//         if(!admin){
//             return res.status(401).json({message: 'Invalid username or password'});
//         }

//         // Check if password is correct
//         const validPassword = await bcrypt.compare(password, admin.ad_password);

//         if(!validPassword){
//             return res.status(401).json({message: 'Invalid username or password'});
//         }

//         // Generate JWT token
//         const token = jwt.sign({id: admin.ad_id}, process.env.JWT_SECRET, {expiresIn: '1h'});

//         // Set token as a cookie
//         res.cookie('session_token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//         });

//         return res.status(200).json({message: 'Login successful'});
//     } catch (error) {
//         return res.status(500).json({message: 'Internal server error'});
//     }
// });


// // module.exports = router;
// const express = require('express');
// const adminController = require('../controllers/admin.controller');

// const router = express.Router();

// router.post('/login', adminController.login);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/auth.controller");

// router.post("/login", authController.login);

// module.exports = router;





// src/router/auth.router.js
const express = require('express');
const router = express.Router();
const db = require('../database/knex');

// API login
router.post('/login', async (req, res) => {
    const { user_username, user_password } = req.body;

    try {
        // Tìm kiếm người dùng trong cơ sở dữ liệu
        const user = await db('user_system').where({ user_username, user_password }).first();

        if (!user) {
            return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
        }

        // Nếu tìm thấy người dùng, trả về thông tin và role của người dùng
        return res.json({
            user_id: user.user_id,
            user_role: user.user_role,
            user_name: user.user_name,
            user_email: user.user_email,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi hệ thống' });
    }
});

module.exports = router;

