const http = require("http");
const fs = require("fs");


function onRequest(request, response){
    response.writeHead(200, {"Content-Type":"text/html"});
    fs.readFile("./index.html", null, (error, data) => {
        if(error){
            response.writeHead(404);
            response.write("file not found");
        }else{
            response.write(data);
        }

        response.end();
    })
}

function onJSONRequest(request, response){
    response.writeHead(200, {"Content-Type":"application/json"});
    const data = {
        name: "Laksmana Yudha",
        age: 21
    }
    response.end(JSON.stringify(data))
}

const PORT = 5000;
http.createServer(onRequest).listen(PORT);