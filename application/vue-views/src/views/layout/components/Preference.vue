<template>
    <div class="fixed-plugin">
        <div class="dropdown show-dropdown">
        	<a href="#" role="button" id="ddwnPreference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        		<svg-list :width="50" :height="50" :classes="['icon-list']" />
        	</a>
        </div>
        <div class="dropdown-menu" aria-labelledby="ddwnPreference">
			<a class="dropdown-item" href="#">Action</a>
			<a class="dropdown-item" href="#">Another action</a>
			<a class="dropdown-item" href="#">Something else here</a>
		</div>
    </div>
</template>

<script>
import svgList from '@/components/Icons/List'
export default {
	name: 'preference',
	components:{
		svgList
	}   
}
</script>

<style scoped>
.fixed-plugin{
	position: fixed;
    top: 164px;
    left: 0px;
    width: 64px;
    background: rgba(0,0,0,.3);
    border-radius: 0 8px 8px 0;
    text-align: center;
    color: red;
    height: 72px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    z-index: 100;
}
.icon-list{
	display: inline-block;
	margin: 10px auto;
}
</style>
