<template>
	<div class=" col-lg-3 col-md-4 col-sm-6 portfolio-item link" >
        <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">{{ title }}</a>
              </h4>
              <p class="card-text">{{ formatDes }}</p>
            </div>
            <div class="card-footer d-flex  justify-content-around">
                <el-rate 
                    v-model="value1"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                ></el-rate>

                <div @click="openFace()">
                    <svg-face 
                        :width="25" 
                        :height="25" 
                        :classes="['icon-list']"
                    />
                </div>
                
                <!--<div class="fb-like" data-href="https://google.com" data-layout="button" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>-->
            </div>
        </div>
	</div>
</template>

<script>
import svgFace from '@/components/Icons/Facebook'
import { getLink } from '@/api/link'
export default {
    name:'preference',
    components:{
        svgFace
    },
    props: {
        nid: Number,
        title: String,
        uid: Number
    },
    computed: {
        formatDes() {
            let str = this.descripcion
            let arrStr = this.descripcion.split(' ')
            let top = 25

            if(arrStr.length > top){
                arrStr.splice(top, (arrStr.length - top) )
                str = arrStr.join(' ') 
            }
            
            return str
        }
    },
    data(){
        return {
            value1: null,
            descripcion: '',
            lenguaje: '',
            fid: 0,
            filename: '',
            filepath: '',
            url: '',
            votos: 0
        }
    },
    mounted() {
        this.value1 = Math.floor(Math.random() * 5);
        let params = { nid: this.nid }
        getLink(params)
        .then(respuesta => {
            let data = respuesta.data
            this.descripcion = data.descripcion
            this.votos = data.votos
        })
    },
    methods:{
        openFace(){
            /*
            FB.ui({
                method: 'share_open_graph',
                action_type: 'og.likes',
                action_properties: JSON.stringify({
                    object:'https://www.google.com',
                })
            }, function(response){console.log(response);});
             */
            FB.ui({
            method: 'share',
            href: 'https://google.com'
            }, function(response){console.log(response);});
        }
    }
}
</script>

<style scoped>

.el-rate{
    width: 120px;
}
.icon-list{
    cursor: pointer;
    fill:#343a40 !important;
    box-shadow: 0px;
    border-radius: 20px;
    transition: box-shadow .2s;
}
.icon-list:hover{
    box-shadow: 0px 2px 10px 1px#343a40;
    border-radius: 20px;
}
</style>
