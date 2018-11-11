import store from './store'
import router from './router'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, setToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/home', '/about/index', '/sugerencia/index']// no redirect whitelist

router.beforeEach((to, from, next) => {
	NProgress.start() // start progress bar

	let ruta = to.path.split('/')

	if ( ruta.length > 4 && `/${ruta[1]}/${ruta[2]}/${ruta[3]}` === '/auth/google/callback'){
		let token = ruta[4]
		setToken(token)
		return next('/')
	}

	if (getToken()) {
		// Se inicializa los valores y se agregan las nuevas rutas
		// esto sucede solo despues de que se loguea
		if (store.getters.roles.length === 0) {

			store.dispatch('GetUserInfo').then(res => { 
				const roles = res.data.roles
				store.dispatch('GenerateRoutes', { roles }).then(() => {
					router.addRoutes(store.getters.addRouters) 
					next({ ...to, replace: true }) 
				})
			}).catch((err) => {
				store.dispatch('FedLogOut').then(() => {
					Message.error('Verification failed, please login again')
					next({ path: '/' })
				})
			})
		} else {
			next()
		}
		
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/home')
      		NProgress.done()
		}
	}
	
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})