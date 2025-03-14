require('dontenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGODB_URI,
    env: process.env.NODE_ENV || 'development'
};