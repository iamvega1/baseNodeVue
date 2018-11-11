'use strict'

const conn = require('./db-connection'),
	TBL_USER = 'edulink_users',
	TBL_RESTPASS = 'edulink_rest_password',
	TBL_ROLES = 'edulink_users_roles',
	bcrypt = require('bcryptjs');

class UserModel {
	
	constructor(){
		this.salt = bcrypt.genSaltSync(12)
	}

	getOne ( mail, id ) {
		let user = { },
			correo = mail.trim()

		return new Promise( ( resolve, reject ) => {
			conn.query(`
				SELECT 
					user.uid,
					user.name,
					user.mail,
					user.pass,
					user.picture,
					user.status,
					roles.rid,
					rol.name rol
				FROM ${TBL_USER} AS user
				INNER JOIN edulink_users_roles AS roles
				ON user.uid = roles.uid
				INNER JOIN edulink_role AS rol
				ON roles.rid = rol.rid
				WHERE user.mail = '${ mail }'
				OR user.uid = ${ id };`
			)
			.then( rows => {
				if(rows.length > 0){
					let arr = JSON.parse(JSON.stringify(rows))
					user = arr[0]
					user.roles = arr.map( item => { return {'id': item.rid, 'name': item.rol} } )
				}
				resolve( user )		
			})
		})
	}

	save( data ) {
		const user = {
			name: data.name,
			pass: data.pass,
			mail: data.mail,
			created: data.created,
			image: data.image
		}

		return new Promise( ( resolve, reject ) => {
			conn.query(`INSERT INTO ${TBL_USER}
					(uid, name, pass, mail, mode, sort, threshold, theme, signature, created, access, login, status, timezone, language,
					picture, init, data, timezone_name, signature_format)
					VALUES (NULL, '${user.name}', '${user.pass}', '${user.mail}', 0, 0, 0, '', '', ${user.created}, 0, 0, 1, 
					NULL, '', '${user.image}', '', NULL, '', 0);`
				).then( (results) => {
					resolve( results.insertId )
				})
		})

	}

	saveRol(uid, rid){
		return new Promise( ( resolve, reject ) => {
			conn.query(`INSERT INTO ${TBL_ROLES} (uid, rid)
				VALUES (${uid}, ${rid});`
			).then( ( ) => {
				resolve()
			})
		})
	}

	login( user ){
		let resp = {
			estado: false,
			idUser: 0
		}
		return new Promise( ( resolve, reject ) => {
			this.getOne( user.username ).then( docs => {

				if(docs.status && bcrypt.compareSync(user.password, docs.pass)){
					resp.estado = true
					resp.idUser = docs.uid
					resp.roles = docs.roles
				}

				resolve(resp)
			})
		})
	}

	restPassword( username ) {
		let resp = {
			estado: false,
			idUser: 0
		},
		currentDate = new Date(),
		txtDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
		return new Promise( ( resolve, reject ) => {
			this.getOne( username ).then( user => {
				if(user.status == 0){
					return reject({message: 'Error: El usuario no existe'})
				}

				user.keypass = this.makeKeypass( user.uid )
				conn.query(`INSERT INTO ${TBL_RESTPASS}
					(rpid, uid, keypass, fecha_exp)
					VALUES (NULL, '${user.uid}', '${user.keypass}', '${txtDate}');`
				).then( () => {
					resolve( user )
				})
				
			})
		})
	}

	validateKeyPass( keypass, password ) {
		let currentDate = new Date()
		return new Promise( ( resolve, reject ) => {
			conn.query(`SELECT rpid, uid, fecha_exp
				FROM ${TBL_RESTPASS}
				WHERE keypass LIKE '${keypass}'
				LIMIT 1;`
			).then( rows => {
				if(rows.length == 0)
					return reject({message: 'Error: No existe el keypass'})
				
				let user = JSON.parse(JSON.stringify(rows[0]))
				let limDate = new Date(user.fecha_exp)
				if (currentDate > limDate){
					return reject({message: `Error: Expiro la solicitud para Restaurar password. Genere otra Solicitud para la Restauracion del password.`})
				}
				this.updatePass( user, password).then( ()=> {
					resolve( user )
				})
				
			})
		})
	}
	updatePass( user, password ){
		user.password = bcrypt.hashSync(password, this.salt)

		return new Promise( ( resolve, reject ) => {
			conn.query(`UPDATE ${TBL_USER}
				SET pass = '${user.password}'
				WHERE ${TBL_USER}.uid = '${user.uid}';`
			).then( () => {
				this.deleteKeyPass( user.uid )
				resolve( )
			})
		})
	}

	updatePicture(user){
		return new Promise( ( resolve, reject ) => {
			conn.query(`UPDATE ${TBL_USER}
				SET picture = '${user.picture}'
				WHERE ${TBL_USER}.uid = '${user.uid}';`
			).then( () => {
				resolve( user )
			})
		})
	}

	makeKeypass( id ) {
		const count = 10
		var text = ""
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < count; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

		return id + text;
	}
	nameAleatorio( name ) {
		const count = 10
		var text = ""
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < count; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

		return name + text;
	}
	deleteKeyPass( uid ) {
		conn.query(`DELETE FROM ${TBL_RESTPASS}
			WHERE uid LIKE ${uid};`
		).then( () => {	})
	} 
}

module.exports = new UserModel()