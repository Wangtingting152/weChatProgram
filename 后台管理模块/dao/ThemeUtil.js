function ThemeUtil() {
    var connection;
    this.init = function () {
        var mysql = require('mysql');  //调用MySQL模块
        //1，创建一个connection
        connection = mysql.createConnection({
            host: 'localhost',       //主机 ip
            user: 'root',            //MySQL认证用户名
            // password: 'wtt19950820/',  //MySQL认证用户密码（王婷婷使用）
            password: 'root',                //MySQL认证用户密码（彭大寒使用）
            port: '3306',                 //端口号
            database: 'hostel_db'          //数据库里面的数据
        });

        //2,连接
        connection.connect();
    }

    //插入数据
    this.inserTheme = function (themeName,themeInfor,imgKey) {
        //1,编写sql语句
        var ThemeAddSql = 'INSERT INTO theme_tb(themeName,themeInfor,imgKey) VALUES(?,?,?)';
        var ThemeAddSql_Params = [themeName,themeInfor,imgKey];
        //2,进行插入操作
        /**
         *query，mysql语句执行的方法
         * 1，userAddSql编写的sql语句
         * 2，userAddSql_Params，sql语句中的值
         * 3，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
         */
        connection.query(ThemeAddSql, ThemeAddSql_Params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
        //5,连接结束
        connection.end();
    }
   // 删除风格
    this.deleteTheme = function (themeId) {
        var sql = "delete from theme_tb where id=?";
        var Params = [themeId];
        connection.query(sql,Params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
        //5,连接结束
        connection.end();
    }


    //查询全部
    this.queryAll = function (call) {

        var sql = "select* from theme_tb";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        //5,连接结束
        connection.end();
    }
    //更新主题名
    this.updateThemeName = function (value,id) {
        var sql = "update theme_tb set themeName = ? where id = ?";
        var Params = [value,id];
        connection.query(sql, Params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }

        });
        connection.end();
    }
    //更新简介

    this.queryThemeID=function(ThemeName,call){
        var sql = "select id from  theme_tb where ThemeName=?";
        var Params = [ThemeName];
        connection.query(sql, Params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
        connection.end();
    }

    this.updateThemeInfor = function (value,id) {
        var sql = "update theme_tb set themeInfor = ? where id = ?";
        var Params = [value,id];
        connection.query(sql, Params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
        connection.end();
    }
    //更新图片
    this.updateImgKey = function (value,id) {
        var sql = "update theme_tb set imgKey = ? where id = ?";
        var Params = [value,id];
        connection.query(sql, Params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
        connection.end();
    }
}
// var theme=new ThemeUtil();
// theme.init();
// var themeName="1";
// theme.queryThemeID(themeName,function (result) {
//     console.log(result[0].id);
// });

// theme.queryAll(function (item) {
//     console.log(item);
// })
// var themeName="aaa";
// var themeInfor="bbb";
// var fileKey="ccc";
// theme.insertTheme(themeName,themeInfor,fileKey);
module.exports = ThemeUtil;
