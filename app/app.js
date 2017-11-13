const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const child_process = require('child_process')
const path = require('path')

app.use( bodyParser.json() )        // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.set('view engine', 'ejs')

app.post('/dothemagic', function(req, res) {
    child_process.exec(`node move.js ${req.body.key} ${req.body.src_bucket} ${req.body.dst_bucket}`)
    child_process.exec('s3cmd la', function(err, stdout, stderr) {
        res.render('done', {a: stdout.split("\n")})
    })
})

app.get('/', function(req, res) {
    child_process.exec('s3cmd la', function(err, stdout, stderr) {
        res.render('index', {a: stdout.split("\n")})
    })
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
