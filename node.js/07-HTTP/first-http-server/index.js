const http = require('http')
const fs = require('fs')

http.createServer(function(request, response) {
    if(request.url == '/favicon.ico') {
        response.writeHead(200);
        response.end('');
        return;
    }
    response.writeHead(200);
    fs.createReadStream(__dirname + '/index.html')
        .pipe(response)
}).listen(3000)