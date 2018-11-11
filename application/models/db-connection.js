'use strict'
const mysql = require('mysql'),
    keys = require('../config/keys'),
    dbConfig = {
        host : keys.mysql_host,
        port : keys.mysql_port,
        user : keys.mysql_user,
        password : keys.mysql_password,
        database : keys.mysql_database
    }

class Connection {
    constructor() {
        this.connection = mysql.createConnection( dbConfig )
        this.test()
    }
    test(){
        this.connection.connect(function(err) {
            if (err) return console.log(err.stack);
            console.log(`Connected to the ${dbConfig.database} db!`);
        });
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err )
                resolve( rows )
            })
        })
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err )
                resolve()
            })
        })
    }
}

module.exports = new Connection()
