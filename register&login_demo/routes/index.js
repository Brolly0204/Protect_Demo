var express = require('express');
var router = express.Router();
var items = [];  //存储用户名和密码
var userName = "";

exports.index = function(req, res) {
    /*第一个参数是ejs模板的索引，对应views文件夹下的文件名，
    第二参数是文件的<%= title %>变量名*/
    res.render('index', { title: 'Home' });
};
exports.login = function(req, res) {
    res.render('login', { title: '用户登陆' });
};

exports.doLogin = function(req, res) {
    var user = {};
    user.username = req.body.username;
    user.password = req.body.password;
    for(var i=0; i<items.length; i++){
        if((items[i].username === user.username) && (items[i].password === user.password)){
            userName = items[i].username;
            res.redirect('/home');
            return;
        }
    }
    res.render('falseid', { title: '用户登陆' });
};

exports.register = function(req, res) {
    res.render('register', { title: '用户注册' });
};

exports.doRegister = function(req, res) {
    var user = {};
    user.username = req.body.username;
    user.password = req.body.password;
    for(var i=0; i<items.length; i++) {
    	if(items[i].username === user.username) {
            res.render('failRegister', { title: '用户注册' });
            return;
    	}
    }

    insertData(user);
    items.push(user); //保存在数组里
    /*向服务器本身发送/login请求*/
    res.redirect('/login');
};

exports.logout = function(req, res) {
    res.redirect('/');
};

exports.home = function(req, res) {
    var user = {
        username: '',
        password: 'admin'
    }

    console.log(",,,,,,,,,,,,,,,,,,,home,,,,,,,,,")
    user.username = userName;
    res.render('home', { title: 'Home', user: user });
};

exports.timer = function(req, res) {
    res.send(timer());
};

function timer(){
     var str = "";
     var time = new Date();
     var year = time.getFullYear();
     var month = time.getMonth();
     var data = time.getDate();
     var hour = time.getHours();
     var minute = time.getMinutes();
     var second = time.getSeconds();
     var msecond = time.getMilliseconds();
     str = "服务器时间"+"  "+hour+"： "+minute+"： "+second+"";
     return str;
}

/*事件发射器绑定*/
var EventEmitter = require('events').EventEmitter;
var change = new EventEmitter();
change.on('find', function(){
    for(var i=0; i<mongoData.length; i++){
        items.push(mongoData[i]);
    }
    console.log(items);
})


/*mongodb数据库处理
数据库是foo 集合是bar*/
var mongo = require('mongodb');
var server = new mongo.Server('localhost', 27017, { auto_reconnect: true });
var db = new mongo.Db('RL', server);
var mongoData = [];

findData();
function findData() {
    db.open(function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('bar', function(err, collection) {
            collection.find().toArray(function(err, bars) {
                if (err) {
                    throw err;
                }
                mongoData = bars;
                change.emit('find');
            });
        });
    });
}

function insertData(data){
    db.open(function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('bar', function(err, collection) {
            collection.insert(data, { safe: true }, function(err, result) {
                if (err) {
                    throw err;
                }
               console.log(result);
            });
        });
    });
}

function upData(oldData, newData) {
    db.open(function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('bar', function(err, collection) {
            collection.update(oldData, { $set: newData }, function(error, bars) {
                if (err) {
                    throw err;
                }
               // console.log(bars);
            });
        });
    });
}


function deleteData(data){
    db.open(function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('bar', function(err, collection) {
            collection.remove(data, { safe: true }, function(err, count) {
                if (err) {
                    throw err;
                }
             //   console.log(count);
            });
        });
    });
}