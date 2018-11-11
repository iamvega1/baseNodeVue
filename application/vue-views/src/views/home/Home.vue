<template>
	<b-container class="home">
      <!-- Page Heading -->
      <h1 class="my-4">Explora
        <small>Seguro encontraras algo de tu interes.</small>
      </h1>

      <div class="row">

        <Link v-for="item in listaLinks" 
        :key="item.nid"
        :title="item.title"
        :nid="item.nid"
        :uid="item.uid"
        />

      </div>
      <!-- /.row -->

      <!-- Pagination -->
      <ul class=" pagination justify-content-center">
        <button @click="cargaMas()" class="btn btn-primary" type="button">Cargar Mas</button>
      </ul>

      <!-- <preference v-if="roles.length != 0" /> -->
	</b-container>
</template>

<script>
import { getAll } from '@/api/link'
import Preference from '@/components/Preference'
import Link from '@/components/Link'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    Preference,
    Link
  },
  computed: {
    ...mapGetters([
      'roles'
      ])
  },
  data(){
    return {
      listaLinks: [],
      currentPage: 0,
      limitPage:0
    }
  },
  mounted() {
    this.iniFace()
    getAll({})
    .then(response => {
      if (!response.data) {
        //reject('error')
        return
      }
      const data = response.data
      this.currentPage = data.page
      this.limitPage = data.totalPages
      this.listaLinks = data.lista;
    })
  },
  methods:{
    iniFace(){
      window.fbAsyncInit = function() {
          FB.init({
          appId            : '471067606703602',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v3.1'
          });
      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v3.1";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    cargaMas(){
      this.currentPage += 1
      
      let data = {
        page: this.currentPage,
      }

      if(this.limitPage < data.page){
        return this.$message({
          message: 'No hay mas elementos',
          type: 'warning',
          duration: 10 * 1000
        })
      }

      getAll(data)
      .then(response => {
        if (!response.data) { 
          return
        }
        const data = response.data
        for(let elemen in data.lista){
          this.listaLinks.push(data.lista[elemen])
        }
        //this.listaLinks = data.lista;
      })
    }
  }
}
</script>

<style>

</style>
