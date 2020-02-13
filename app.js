var http = require('http');
var fs = require('fs'); // to get data from html file 
var client = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/admin';

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // req.url stores the path in the url 
    var url = req.url;
    if (url === "/") {
        // fs.readFile looks for the HTML file 
        // the first parameter is the path to the HTML page 
        // the second is the call back function 
        // if no file is found the function gives an error 
        // if the file is successfully found, the content of the file are contained in pgres 
        fs.readFile("head.html", function (err, pgres) {
            console.log(pgres)
            if (err)
                res.write("HEAD.HTML NOT FOUND");
            else {
                var url = 'mongodb://localhost:27017/admin';
                client.connect(url, { useNewUrlParser: true }, function (err, db) {
                    if (err) {
                        console.log("Connection failed")
                    }
                    console.log("Connected to mongoDB");
                    var dbo = db.db("test")
                    var cursor = dbo.collection('test').find();
                    cursor.each(function (err, doc) {
                        if (doc != null)
                            console.log(doc);
                    });
                    db.close();

                });
            }
        });
    }
    else if (url === "/tailPage") {
        fs.readFile("tail.html", function (err, pgres) {
            if (err)
                res.write("TAIL.HTML NOT FOUND");
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgres);
                res.end();
            }
        });
    }

}).listen(5000, function () {
    console.log("SERVER STARTED PORT: 5000");
});


//dbconnect*********************************************************************************************************

// var client = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/admin';
// client.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) {
//         console.log("Connection failed")
//     }
//     console.log("Connected to mongoDB");
//     var dbo = db.db("test")
//     var cursor = dbo.collection('test').find();
//     cursor.each(function (err, doc) {
//         if (doc != null)
//             console.log(doc);
//     });
//     db.close();

// });

