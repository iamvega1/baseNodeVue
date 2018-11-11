'use strict'

var conn = require('./db-connection'),
	menu = require('./menu-model')


class MainModel {
	constructor (){

	}

	getMenu (cb) {
		menu.getMenu().then(obj => {
			cb(obj)
		}).catch( err => {
			console.log(err);
		})
	}

}

module.exports = new MainModel