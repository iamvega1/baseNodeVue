<template>

	<b-navbar type="dark" toggleable="md" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

		<div class="container"> <!-- Centra el Menu -->

			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>			
			<router-link tag="a" class="navbar-brand" to="/"> Edulink </router-link>

			<b-collapse is-nav id="nav_collapse">

				<b-navbar-nav>
					<!-- Se crean los item que no tienen hijos -->
					<template v-for="item in permission_routers" v-if="!item.hidden&&item.children">
						
						<router-link tag="li" class="nav-item" :key="item.name" v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"> 
							<a class="nav-link" href="#">{{ item.children[0].meta.title }} </a>
						</router-link>

						<!-- Se crean los item que tienen hijos -->
						<b-nav-item-dropdown v-else :key="item.name" :text="item.name"  right>

							<router-link tag="a" role="menuitem" class="dropdown-item" v-for="child in item.children" v-if="!child.hidden" :key="child.name" :to="item.path+'/'+child.path"> 
									{{child.meta.title}}
							</router-link>

						</b-nav-item-dropdown>
					</template>

				</b-navbar-nav>

				<!-- Se crea el buscador y el boton de Inicio de sesion -->
				<b-navbar-nav class="ml-auto">

					<b-nav-form>
						<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
						<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
					</b-nav-form>
					
					<b-nav-item v-if="roles.length == 0" href="/auth/google" right>Inicia Sesion</b-nav-item>
					<b-nav-item v-else @click="logout()" right>Cerrar sesion</b-nav-item>

				</b-navbar-nav>			

			</b-collapse>

    	</div>
	</b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'SidebarItem',
	computed: {
	    ...mapGetters([
	      'permission_routers',
	      'roles'
	    ])
    },
    methods: {
    	logout(){
    		this.$store.dispatch('FedLogOut').then(() => {
				location.reload()
			})
    	},
    	hasOneShowingChildren(children) {
			const showingChildren = children.filter(item => {
				return !item.hidden
			})
			if (showingChildren.length === 1) {
				return true
			}
			return false
		}
	}
}
</script>

<style scoped>


</style>