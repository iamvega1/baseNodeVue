'use strict'

var conn = require('./db-connection')
const TBL_TERM = 'edulink_term_data',
	VID = 1 // Id correspondiente a audiencia en vocabulary

class AudenciaModel {
	constructor (){

	}

	getAudiencia () {
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
				
				let menu = JSON.parse(JSON.stringify(rows)),
					lm = menu.length;
				resolve( menu )	
			})
		})
	}

	subMenu (tid ) {
		return new Promise( ( resolve, reject ) => { 
			conn.query(`
				SELECT edulink_term_data.tid, 
					edulink_term_data.name, 
					edulink_term_data.weight 
				FROM edulink_term_data 
				INNER JOIN edulink_term_hierarchy 
				ON edulink_term_data.tid = edulink_term_hierarchy.tid 
				WHERE edulink_term_hierarchy.parent = ${tid}`
			)
			.then( rows => {
				
				let submenu = JSON.parse(JSON.stringify(rows))
				resolve( submenu )
			})
		})
	}
}

module.exports = new AudenciaModel()