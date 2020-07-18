'use strict';
var dbConn = require('./../config/db.config');

//Produto object create
var Produto = function (produto) {
    this.id = produto.id;
    this.nome = produto.nome;
};

// Produto.create = function (newEmp, result) {
//     dbConn.query("INSERT INTO employees set ?", newEmp, function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else {
//             console.log(res.insertId);
//             result(null, res.insertId);
//         }
//     });
// };

Produto.findById = function (id, result) {
    dbConn.query("Select * from produto where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Produto;