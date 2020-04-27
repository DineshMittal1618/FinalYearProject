const jwt = require('jsonwebtoken')
const User = require('../src/models/user')

const auth = async (req, res, next) => {
    console.log(req.cookies.Authorization);
    
    try {
        const token = req.cookies.Authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(token);
        
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            console.log('hii');
            
            throw new Error();
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth