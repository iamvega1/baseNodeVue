'use strict'

var conn = require('./db-connection')

class MenuModel {
	constructor (){

	}

	getMenu () {
		return new Promise( ( resolve, reject ) => {
			conn.query(`
				SELECT edulink_term_data.name,
					edulink_term_data.tid,
					edulink_term_data.weight 
				FROM edulink_term_hierarchy 
				INNER JOIN edulink_term_data 
				ON edulink_term_hierarchy.tid = edulink_term_data.tid 
				where edulink_term_data.vid = 2 AND edulink_term_hierarchy.parent = 0;`
			)
			.then( rows => {
				
				let menu = JSON.parse(JSON.stringify(rows)),
					lm = menu.length;

				for(let i = 0; i < lm; i++){

					this.subMenu(menu[i].tid)
					.then( sub => {
						menu[i].sub = sub
						if(i == (lm - 1)){
							resolve( menu )
						}
					})
				}		
			}).catch( error => {
				return reject( err )
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

module.exports = new MenuModel()