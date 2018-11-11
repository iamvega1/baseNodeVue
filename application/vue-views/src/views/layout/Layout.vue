<template>
    <div class="app-wrapper">
        <navbar />
        <div class="main-container">
            <section class="app-main" style="min-height: 100%">
                <transition name="fade" mode="out-in">
                    <keep-alive :include="cachedViews">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </section>
        </div>
        <pie-de-pagina></pie-de-pagina>
    </div>
</template>

<script>
import { Navbar, PieDePagina } from './components'
export default {
    name: 'AppMain',
    components: {
        Navbar,
        PieDePagina
    },
    mounted() {
        this.addViewTags()
    },
    watch: {
        $route() {
          this.addViewTags()  
        }
    },
    computed: {
        cachedViews(){
           return this.$store.state.tagsView.cachedViews
        }
    },
    methods: {
        generateRoute(){
            if (this.$route.name){
                return this.$route
            }
            return false
        },
        addViewTags(){
            const route = this.generateRoute()
            if (!route){
                return false
            }
            this.$store.dispatch('addVisitedViews', route)
        }
    }  
}
</script>

<style scoped>
/*fade*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/*fade*/
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>

