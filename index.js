"use strict";

module.exports = function(connection,verify){

	return class Model {

		constructor( tableName, schema ){
			this.tableName = tableName;
			this.schema = schema;
		}

		Create(model){
			var tableName = this.tableName;

			return verify(model,this.schema)
				.then(function(errors){
					if (errors.length){
						return Promise.reject(errors);
					}

					return connection.create(tableName,model);
				})
				.then(function(results){
					return results.rows;
				});
		}

		Read(query){
			return connection.read(this.tableName,query)
				.then(function(results){
					return results.rows;
				});
		}

		Update(query,values){
			return connection.update(this.tableName,query,values)
				.then(function(results){
					return results.rows;
				});
		}

		Destroy(query){
			return connection.destroy(this.tableName,query)
				.then(function(results){
					return results.rows;
				});
		}
	}
}