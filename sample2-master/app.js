var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

var db = new sqlite3.Database('youtube.db')

app.get('/', function (req, res, next) {
    var query = "\
    SELECT m.owner, c.name, m.title, m.thumbnail, m.content, m.datetime, m.views, m.good_evaluate, m.bad_evaluate\
    FROM channel c, movie m\
    WHERE c.account = m.owner\
    ";
    //'スラッシュ'だけが書かれているローカルホスト；3000で何も書かれていない時の処理
    /*"\
        SELECT t.account, u.name, t.datetime, t.content\
        FROM tweet t, follow f, user u\
        WHERE t.account = u.account and f.follower_account = 'mob1' and f.followee_account = t.account;\
        ";*/
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

