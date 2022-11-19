var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://root:root123@cluster0.pxv5g.mongodb.net/TASK_DATABASE?retryWrites=true&w=majority"

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});