import mysql from "mysql2/promise";

export const mysqlpool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"HAm$0448448",
    database:"student_management",
});