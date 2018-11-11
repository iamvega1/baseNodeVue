'use strict'

var conn = require('./db-connection')
const TBL_TERM = 'edulink_term_data',
	VID = 4 // Id correspondiente a material en la tabla vocabulary

class MaterialModel {

	getAll () {
		let material = []

		return new Promise( ( resolve, reject ) => {
			conn.query(`
				SELECT term.name,
					term.tid,
					term.weight 
				FROM edulink_term_hierarchy 
				INNER JOIN ${TBL_TERM} AS term
				ON edulink_term_hierarchy.tid = term.tid 
				where term.vid = ${VID} AND edulink_term_hierarchy.parent = 0;`
			)
			.then( rows => {
				
				material = JSON.parse(JSON.stringify(rows))
				resolve( material )

			})
		})
	}

}

module.exports = new MaterialModel()