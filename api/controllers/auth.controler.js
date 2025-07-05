const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { sub, email, name, picture } = ticket.getPayload();

        // Kiểm tra user trong DB
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                googleId: sub,
                name,
                email,
                picture,
            });
        }

        // Tạo JWT cho hệ thống
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({ accessToken, user });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};
