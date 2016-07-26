
'use strict';

var yog = require('yog2-kernel');

var app = yog.bootstrap({
    rootPath: __dirname
}, function () {
    console.log('插件加载完成');
});

app.set('port', process.env.PORT || 8086);
app.disable('x-powered-by');

var server = yog.server = app.listen(app.get('port'), function () {
    console.log('服务已经启动在端口 ' + server.address().port);
});

server.on('connection', function (socket) {
    // disable nagle
    socket.setNoDelay(true);
});

if (parseInt(process.versions.node.split('.')[0], 10) >= 6) {
    server.on('clientError', function (err, socket) {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
}


