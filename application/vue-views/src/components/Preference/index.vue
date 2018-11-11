<template>
    <draggable
    @end="endDrag"
    >
        <div class="fixed-plugin" ref="divDrag" id="divDrag" :class="{iconlistado: !showiconlistado}">
            <div class="dropdown show-dropdown">
                <svg-list @clik-svg="open" :width="35" :height="35" :classes="['icon-list']" /> 
                <div v-if="!this.showiconlistado">
                    <div class="d-flex justify-content-end" style="padding-top: 14px; padding-right: 16px">
                        <el-button @click="close" type="danger" icon="el-icon-close" circle></el-button>
                    </div>
                </div>
            </div>
            <div class="dropdown-menu" aria-labelledby="ddwnPreference">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
    </draggable>
</template>

<script>
import svgList from '@/components/Icons/List'
import draggable from 'vuedraggable'
export default {
	name: 'preference',
	components:{
        svgList,
        draggable
	},
	data() {
		return {
            showSvgList: true,
			showiconlistado: true,
            classPreference: ''
		}
	},
    methods: {
        close(){
            this.showiconlistado = true
        },
        open(){
            this.showiconlistado = false
            this.$refs.divDrag.style['left'] = `10px`
            this.$refs.divDrag.style['top'] = `214px`
        },
        endDrag(event){
            let div = document.getElementById('divDrag'),
                x = window.event.clientX,
                y = window.event.clientY

            this.$refs.divDrag.style['left'] = `${x}px`
            this.$refs.divDrag.style['top'] = `${y}px`
        }
    },
	mounted() {
		
    },    
}
</script>

<style scoped>
.fixed-plugin{
	position: fixed;
    top: 214px;
    left: 10px;
    width: 64px;
    background: rgba(0,0,0,.3);
    border-radius: 50px;
    text-align: center;
    color: red;
    height: 72px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    z-index: 100;
    transition: all .5s;
}
.iconlistado{
    top: 80px;
    height: 700px;
    width: 350px;
}
.icon-list{
	display: inline-block;
	margin: 18px auto;
    cursor: pointer;
    transition: all .5s;
    fill: #343a40;
}
.iconlistado .icon-list{
    display: none;
    transition: all .5s;
}
</style>
