"use strict";

/**Extensible Model-building class*/
class BaseModel{

	/**
	Associate database adapter, model validation, table name, and schema constraints
	@param {object} connection - containing database interfacing CRUD functions
	@param {function} verify - schema verification function
	@param {string} tableName - table name in sql or other database
	@param {object} schema - schema describing model properties (required, unique, type, pattern, & length)
	*/
	constructor(connection,verify,tableName,schema){
		this.connection = connection;
		this.verify = verify;
		this.tableName = tableName;
		this.schema = schema;
	}

	/**
	Validate model to schema and insert into database if valid
	@param {object} model - data for inserting new model instance into database
	@returns {Promise} Promise that resolves with array of database rows
	*/
	Create(model){

		return this.verify(model,this.schema)
			.then((function(errors){
				if (errors.length){
					return Promise.reject(errors);
				}

				return this.connection.create(this.tableName,model);
			}).bind(this))
			.then(function(results){
				return Promise.resolve(results.rows);
			});
	}

	/**
	Find models in database matching query
	@param {object} query - object specifying properties to look for in database
	@returns {Promise} Promise that resolves with array of database rows
	*/
	Read(query){
		return this.connection.read(this.tableName,query)
			.then(function(results){
				return Promise.resolve(results.rows);
			});
	}

	/**
	Update models in database matching query
	@param {object} query - object specifying properties to look for in database
	@param {object} values - object specifying fields and values to be updated
	@returns {Promise} Promise that resolves with array of database rows
	*/
	Update(query,values){
		return this.connection.update(this.tableName,query,values)
			.then(function(results){
				return Promise.resolve(results.rows);
			});
	}

	/**
	Destroy models in database matching query
	@param {object} query - object specifying properties to look for in database
	@returns {Promise} Promise that resolves with array of database rows
	*/
	Destroy(query){
		return this.connection.destroy(this.tableName,query)
			.then(function(results){
				return Promise.resolve(results.rows);
			});
	}
}

/**
Provides a simple javascript class for model building
@module models-js
*/
module.exports = BaseModel;