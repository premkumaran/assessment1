const express = require('express');
const app = express();
const port = 8000

app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencod 

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@s5w0rd',
    database: 'assessment'
})
connection.connect();
app.post('/users', function (req, resp) {

    if (req.body.username && req.body.password) {

        connection.query('SELECT * FROM assessment.user WHERE username=? and password=?', [req.body.username, req.body.password], function (err, result, req, res) {
            if (err)
                throw err;
                console.log(result);
            if (result.length>0) {
                resp.send({ user: result[0], status: "success" })
                // console.log(res);
            } else {
                resp.send({ status: "failed" })
            }
          
        })
    }
})
app.post('/insert', function (req, resp) {

        connection.query('INSERT INTO assessment.user (username,password,email,phonenumber,address,usertype) VALUE(?,?,?,?,?,?)', [req.body.username, req.body.password,req.body.email,req.body.phonenumber,req.body.address,req.body.usertype], function (err, result, req, res) {
            if (err)
                throw err;
                console.log(result);
                resp.send({ status: "insert" })
        })
    })
    app.post('/update', function (req, resp) {

        connection.query('UPDATE  assessment.user SET username=?,password=?,email=?,phonenumber=?,address=?,usertype=? WHERE id=?', [req.body.username, req.body.password,req.body.email,req.body.phonenumber,req.body.address,req.body.usertype,req.body.id], function (err, result, req, res) {
            if (err)
                throw err;
                console.log(result);
                resp.send({status:" data update"})
        })
    })
    app.get('/details', function (req, resp) {

        connection.query('SELECT * FROM assessment.user', [req.body.username, req.body.password,req.body.email,req.body.phonenumber,req.body.address,req.body.usertype], function (err, result, req, res) {
            if (err)
                throw err;
                console.log(result);
                resp.send( result )
        })
    })
    app.post('/delete', function (req, resp) {

        connection.query('DELETE FROM assessment.user WHERE id=?',[req.body.id], function (err, result, req, res) {
            if (err)
                throw err;
                console.log(result);
                resp.send("deleted" )
        })
    })
    app.post('/filter', function (req, resp) {
console.log(req.body.username);
        connection.query(`SELECT * FROM assessment.user WHERE username LIKE '%${req.body.username}%'`, function (err, result, req, res) {
            if (err)
                throw err;
                console.log(result);
                resp.send( result )
        })
    })
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})