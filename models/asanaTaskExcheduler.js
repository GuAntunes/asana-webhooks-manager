'use strict';
var dbConn = require('./../config/db.config');

//  Referencia da implementação : https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6

//AsanaTaskExcheduler object create
var AsanaTaskExcheduler = function (task, product_id) {
    this.task_id = task.gid;
    this.created_at = task.created_at;
    this.completed_at = task.completed_at;
    this.completed = task.completed;
    this.modified_at = task.modified_at;
    this.task_name = task.name;
    this.product_id = product_id;
    if (task.memberships.length > 0) {
        if (task.memberships[0].section) {
            this.section_id = task.memberships[0].section.gid;
            this.section_name = task.memberships[0].section.name;
        }
        if (task.memberships[0].project) {
            this.project_id = task.memberships[0].project.gid;
            this.project_name = task.memberships[0].project.name;
        }
    }
};

AsanaTaskExcheduler.create = function (task, result) {
    dbConn.query("INSERT INTO asana_task set ?", task, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

AsanaTaskExcheduler.update = function (id, task, result) {
    dbConn.query("UPDATE asana_task SET ? WHERE id = ?", [task, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

AsanaTaskExcheduler.findByTask = function (id, result) {
    dbConn.query("Select * from asana_task where task_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


module.exports = AsanaTaskExcheduler;