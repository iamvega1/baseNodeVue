<template>
	<el-row class="padding" :gutter="20">
		<el-col :xs="12" :sm="6" :offset="6">
			<img :src="img_404" alt="404" class="img_404">
		</el-col>
		<el-col :xs="12" :sm="6" class="" >
			<h1>Ooops!</h1>
			<h2>No encontramos tu pagina.</h2>
			<p>Verifica que la URL sea correcta.</p>
			<p class="second">Da click en el siguiente boton y regresa a la pagina principal.</p>
			<a href="/" class="btn_return">Regresar</a>
		</el-col>
	</el-row>
</template>

<script>
import img_404 from '@/assets/404.jpg'
export default {
	name: 'page404',
	data() {
		return {
			img_404
		}
	}    
}
</script>

<style scoped>
.padding{
	padding-top: 200px;
	font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
	opacity: 0;
	animation-name: slideUp;
	animation-duration: 0.5s;
	animation-delay: 0.3s;
	animation-fill-mode: forwards;
}
h1{
	color: #1482f0;
}
.img_404{
	width: 100%;
	border-radius: 50%;
}
.center{
	text-align: center;
}
.second{
	font-size: 13px;
    color: #999;
}
.btn_return{
	display: block;
	float: left;
	width: 110px;
	height: 36px;
	background: #1482f0;
	border-radius: 100px;
	text-align: center;
	color: #ffffff;
	
	font-size: 14px;
	line-height: 36px;
	cursor: pointer;
	
}
@keyframes slideUp {
	0% {
		transform: translateY(60px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
