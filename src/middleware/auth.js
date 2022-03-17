

/*
app.get('/devices', mw.requireAuthentication, (req, res) => {
        res.send('Devices');
});




const mw = {
        requireAuthentication : (req, res, next) => {
                console.log('Request URL: ' + req.originalUrl);
                next();
        },
        logger : (req, res, next) => {
                console.log('Time:', Date.now())
                next();
        }
}

module.exports = mw;

*/