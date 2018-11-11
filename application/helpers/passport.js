const GoogleStrategy = require('passport-google-oauth20').Strategy,
	keys = require('../config/keys'),
	{ generateToken } = require('../helpers/auth'),
	um = require('../models/user-model');

module.exports = function(passport){
  	passport.use(
    	new GoogleStrategy({
			clientID: keys.googleClientID,
			clientSecret:keys.googleClientSecret,
			callbackURL:'/auth/google/callback',
			proxy: true
    	}, (accessToken, refreshToken, profile, done) => {

			const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'))

			const userGoogle = {
				googleID: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				image: image
			}
			let userLocal = {} 

			um.getOne(userGoogle.email, 0.1)
			.then( docs => {
				userLocal = docs
				userLocal.image = userGoogle.image

				if(userLocal.status != undefined){
					userLocal.token = generateToken(userLocal)			
					done(null, userLocal);
				} else {
					/* 
						Si el usuario no exite se agrega a la BD y se le asigna el rol de 'authenticated' por default 
						al cual corresponde el rid = 2
					*/
					const created = new Date().getTime().toString().substr(0, 10)

					userLocal.mail = userGoogle.email
					userLocal.created = created
					userLocal.name = um.nameAleatorio(userGoogle.firstName)
					userLocal.pass = ''

					um.save(userLocal)
					.then( (id) => {
						userLocal.uid = id
						userLocal.token = generateToken(userLocal)
						return um.saveRol(id, 2)
					})
					.then( () =>{
						done(null, userLocal)
					})
				}
			})		
    	})
 	);

 	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		//um.getOne('', id)
		//.then( user => {
			done(null, user);
		//})
	});
}