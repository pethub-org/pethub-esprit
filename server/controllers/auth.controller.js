const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../services/token.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // todo : populate should not populate user password
        const user = await User.findOne({ email })
            .populate({ path: "friendList", model: 'User' })
            .populate({ path: 'friendRequests', model: 'User' })
        if (!user) {
            return res.status(400).json({ error: `Invalid credentials` });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = generateToken(user, 'access_token');
        const refreshToken = generateToken(user, 'refresh_token');
        const result = {
            email, firstname: user.firstname, lastname: user.lastname, token: accessToken, tokenVersion: user.tokenVersion, role: user.role, _id: user._id, photos: user.photos, friendList: user.friendList, friendRequests: user.friendRequests, tokenVersion: user.tokenVersion, ban: user.ban, accountConfirmed: user.accountConfirmed
        }
        console.log({ refreshToken })
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 3600000 })
        return res.status(200).json(result)

    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const logout = (req, res) => {
    res.clearCookie('jwt');
    // revokeToken();
    return res.status(200).json({ message: 'logged out successfuly' });

}

const refreshToken = async (req, res) => {
    try {
        let refreshToken = req.cookies?.jwt;
        console.log({ refreshToken })
        let payload = jwt.decode(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        console.log({ payload })

        let isRefreshTokenValid = payload.exp * 1000 > Date.now()

        if (!isRefreshTokenValid) {
            res.clearCookie('jwt');
            return res.status(403).json({ message: 'Invalid Refesh token' })
        }
        const user = await User.findById(payload.id);
        const accessToken = generateToken(user, 'access_token');
        refreshToken = generateToken(user, 'refresh_token');
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 3600000 })
        return res.status(200).json({ accessToken })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

const revoke = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);;
        if (!user) {
            return res.status(400).json({ error: 'Bad Request can not revoke token' })
        }
        user.tokenVersion++
        await user.save();
        return res.status(200).json({ message: 'Token successfully revoked' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const confirmAccount = async (req, res) => {
    try {
        const { token } = req.params;
        console.log(token)
        const payload = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);

        console.log({ payload })

        const user = await User.findByIdAndUpdate(payload.id, { accountConfirmed: true })
        // await user.save();
        console.log({ user })

        return res.status(200).json({ message: "Account has been confirmed" });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong when confirming account : " + error.message });
    }
}

module.exports = { login, logout, refreshToken, refreshToken, revoke, confirmAccount }