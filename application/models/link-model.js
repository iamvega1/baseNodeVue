'use strict'
const TBL_NODE = 'edulink_node', // tabla principal donde se guarda el link.
	TBL_CNT_ENLACE = 'edulink_content_type_enlace',
	TBL_VOTIN = 'edulink_votingapi_cache',
	TBL_FILES = 'edulink_files',
	TBL_VOCA = 'edulink_vocabulary',
	TBL_TD = 'edulink_term_data',
	TBL_TN = 'edulink_term_node';

let conn = require('./db-connection')

class LinkModel {
	constructor (){

	}

	getList (tag, categoria, ppage, nlink) {
		let links = {}

		return new Promise( ( resolve, reject ) => {
			let numRows,
				queryPagination,
				numlinkXPage = nlink || 16,
				page = ppage || 0,
				skip,
				query


			query = this.getQuery( tag, categoria )
			skip = page * numlinkXPage


			this.getTotal()
			.then(total => {

				links.total = total
				// Obtiene el total de links que cumplen con la restriccion del tag.
				links.totalPages = parseInt(total / numlinkXPage, 10) 
				// calcula el numero de paginas que habra, correspondientes a la busqueda.
				links.page = page + 1
				// Indica la pagina actual que se consulta.
				return conn.query( `${query} LIMIT ${skip},${numlinkXPage};` )
				
			})
			.then( data => {
				links.lista = JSON.parse(JSON.stringify(data))
				resolve(links)
			})
		})
	}

	getLink(nid){
		return new Promise( (resolve, reject) => {
			conn.query(`
				SELECT ${TBL_CNT_ENLACE}.field_url_url url,
					${TBL_CNT_ENLACE}.field_description_value descripcion,
					${TBL_CNT_ENLACE}.field_language_value lenguaje,
					${TBL_FILES}.fid,
					${TBL_FILES}.filename,
					${TBL_FILES}.filepath
				FROM ${TBL_CNT_ENLACE}
				LEFT JOIN ${TBL_FILES}
				ON ${TBL_CNT_ENLACE}.field_image_fid = ${TBL_FILES}.fid
				where ${TBL_CNT_ENLACE}.nid = ${nid}
				LIMIT 1;`)
			.then( data => {
				let row = JSON.parse(JSON.stringify(data))
				if(row.length > 0) {
					let link = row[0]
					this.gettotalVote(nid)
						.then( value => {
							row[0].votos = value
							resolve(row[0])
						})
				} else {
					resolve(0)
				}
			})
		})
	}

	getLinkDetalle(nid, categoria){
		//console.log(nid + ' ' + categoria)
		return new Promise( (resolve, reject) => {

			conn.query(`
				SELECT
					tn.tid,
				    t.name
				FROM ${TBL_VOCA} AS v
				INNER JOIN ${TBL_TD} AS t
				ON v.vid = t.vid
				INNER JOIN ${TBL_TN} AS tn
				ON t.tid = tn.tid
				WHERE v.name LIKE '${categoria}'
				AND tn.nid = ${nid}`)
			.then( data => {
				let row = JSON.parse(JSON.stringify(data))
				resolve({name: categoria, items: row})
			})
		})
	}

	getTitleAndUser(nid){
		return new Promise( (resolve, reject) => {

			conn.query(`
				SELECT n.title,
					n.created,
					us.name
				FROM edulink_node AS n
				INNER JOIN edulink_users AS us
				ON n.uid = us.uid
				WHERE n.nid LIKE ${nid}
				`)
			.then( data => {
				if(data.length == 0)
					return resolve({})
				let row = JSON.parse(JSON.stringify(data[0]))
				//console.log(data)
				resolve(row)
			})
		})
	}

	gettotalVote(link){
		return new Promise( (resolve, reject) => {
			conn.query(`
				SELECT ${TBL_VOTIN}.value
				FROM ${TBL_VOTIN}
				where ${TBL_VOTIN}.content_id = ${link}
				AND ${TBL_VOTIN}.function = "sum"
				LIMIT 1;`)
			.then( data => {
				let row = JSON.parse(JSON.stringify(data))
				if(row.length > 0) {
					resolve(row[0].value)
				} else {
					resolve(0)
				}
			})
		})
	}

	getfile(fid){
		return new Promise( (resolve, reject) => {
			let obj = {}
			conn.query(`
				SELECT edulink_files.fid,
					edulink_files.filename,
					edulink_files.filepath
				FROM edulink_files
				where edulink_files.fid = ${fid}
				LIMIT 1;`)
			.then( data => {
				let row = JSON.parse(JSON.stringify(data))
				if(row.length > 0) {
					obj.fid = row[0].fid
					obj.filename = row[0].filename
					obj.filename = row[0].filepath
				} else {
					obj.fid = 0
					obj.filename = ''
					obj.filename = ''
				}
				resolve(obj)
			})
		})
	}

	getTotal ( tid ) {
		let queryTid = `SELECT COUNT(*) total
				FROM edulink_node n
				INNER JOIN edulink_term_node t
				ON n.nid = t.nid
				WHERE n.type = "enlace"
				AND t.tid = ${tid}
				AND n.status = 1`,
			querySinTid = `SELECT COUNT(*) total
				FROM edulink_node
				WHERE edulink_node.type = "enlace"
				AND edulink_node.status = 1`,
			query = querySinTid

		if( !(tid == null))
			query = queryTid
		return new Promise( ( resolve, reject ) => { 
			conn.query( query )
			.then( rows => {
				let total = JSON.parse(JSON.stringify(rows))
				resolve( total[0].total )
			})
		})
	}

	updateVoto( nid ) {
		let value
		return new Promise( (resolve, reject) => {
			this.gettotalVote( nid )
			.then( data => {
				value = parseInt(data, 10)
				value = ++value
				//console.log(value)
				conn.query(
					`UPDATE ${TBL_VOTIN}
					SET value = ${value}
					where content_id = ${nid}
					AND function = "sum"
					LIMIT 1;`)
				.then( resp => resolve())
			})
		})
	}

	getQuery( tag, categoria ){
		let querys = [
		{
			name: 'nuevo',
			querys: [
				`SELECT 
					node.nid,
					node.uid,
					node.title
				FROM ${TBL_NODE} AS node
				where node.type = "enlace"
				AND node.status = 1
				ORDER BY node.created DESC`,
				`SELECT 
					node.nid,
					node.uid,
					node.title
				FROM ${TBL_NODE} AS node
				INNER JOIN edulink_term_node t
				ON node.nid = t.nid
				where node.type = "enlace"
				AND t.tid = ${tag}
				AND node.status = 1
				ORDER BY node.created DESC`]
		},
		{
			name: 'popular',
			querys: [
			`SELECT 
				node.nid,
				node.uid,
				node.title,
				voti.value
			FROM ${TBL_VOTIN} AS voti
			RIGHT JOIN ${TBL_NODE} AS node
			ON voti.content_id = node.nid
			WHERE voti.function = "sum"
			AND node.type = "enlace"
			AND node.status = 1
			order BY voti.value DESC`,
			
			`SELECT 
				node.nid,
				node.uid,
				node.title,
				voti.value
			FROM ${TBL_VOTIN} AS voti
			INNER JOIN edulink_term_node t
			ON voti.content_id = t.nid
			RIGHT JOIN ${TBL_NODE} AS node
			ON voti.content_id = node.nid
			WHERE voti.function = "sum"
			AND t.tid = ${tag}
			AND node.type = "enlace"
			AND node.status = 1
			order BY voti.value DESC`]
		},
		{
			name: 'todos',
			querys: [`SELECT 
						node.nid,
						node.uid,
						node.title
					FROM ${TBL_NODE} AS node
					where node.type = "enlace"
					AND node.status = 1`,
					`SELECT 
						node.nid,
						node.uid,
						node.title
					FROM ${TBL_NODE} AS node
					INNER JOIN edulink_term_node t
					ON node.nid = t.nid
					where node.type = "enlace"
					AND t.tid = ${tag}
					AND node.status = 1`]
		}]

		let result = querys.filter( query => query.name == categoria.toLowerCase()),
			respuesta = result[0].querys[0]
		
		if(!(tag == 0))
			respuesta = result[0].querys[1]
		return respuesta
	}

	save ( data ) {

		return new Promise( (resolve, reject) => {
			conn.query(`
				INSERT INTO ${TBL_NODE}
					('nid', 'vid', 'type', 'language', 
					'title', 'uid', 'status', 'created', 
					'changed', 'comment', 'promote', 'moderate', 
					'sticky', 'tnid', 'translate')
				VALUES (NULL, '0', 'enlace', 'es', 
					'prueba del mariachi', '10', '1', 
					'1244845025', '1244845025', '2', 
					'1', '0', '0', '0', '0')
			`)
			.then( data => {
				console.log(data)
			})
		})
	}

}

module.exports = new LinkModel()