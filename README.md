# Get Started

## Install

`npm install models-js`

## Use


    const BaseModel = require("model-js");
    const connection = require("something") /*database interface*/
    const verify = require("something") /*schema validation function*/
    
    /*Connect baseModel with database and validation method*/
    class ConnectedBaseModel extends BaseModel{
        constructor(tableName, schema){
            super(connection, verify, tableName, schema);
        }
    }

    /*Extend class to for simple creation of new models*/
    class UserModel extends ConnectedBaseModel{
        constructor(){
            var tableName = "tablename"; /*name of database table/collection*/
            var schema = {...}; /*schema representation of user model*/
            super(tableName, schema);
        }
    
        Create(model){
            model = doSomething(model); /*perform some task before model creation*/
            super.Create(model);
        }
    }
    
    var user = new UserModel();
    user.Create({
            email: "bob@bob.com",
            password: "1223334444"
        })
        .then(function(result){
            doSomething(result);
        });
