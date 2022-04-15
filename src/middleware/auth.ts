// Request'e response vermeden önce auhenticate et. Bu security için uygulanabilir. Sadece keycloak üzerinde kayıtlı olanla kullanıcılar  response alabilir
// Aynısı "devices" veritabanında gelen Token veya SN/ID ile kayıtlı olan cihazları socket.io ile servis et. Dışarıdan başka cihaz veri  göndermesin

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
