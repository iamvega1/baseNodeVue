<template>
	<div>
		<header ref="header" class="masthead text-white text-center">

			<div class="overlay"></div>
			
			<div class="container">
				<div class="row">
				<div class="col-lg-8 col-md-10 mx-auto">
					<div class="post-heading">
						<h1 class="my-5">Ayudamos a facilitar la busqueda de datos con links confiables.</h1>
						<h2 class="subheading">Tu tambien puedes sugerirnos ideas.</h2>
					</div>
				</div>
				</div>
			</div>
		</header>
		<section class="features-icons bg-light text-center mt-2">
			<div class="container">
				<div class="row">
				<div class="col-lg-4">
					<div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
					<div class="features-icons-icon d-flex">
						<i class="icon-screen-desktop m-auto text-primary"></i>
					</div>
					<h3>Fully Responsive</h3>
					<p class="lead mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa facere quod at, nemo nesciunt molestiae accusantium in aliquam aspernatur nulla quis odit tempore reprehenderit, reiciendis amet eligendi illum? Quibusdam, qui.</p>
					<p class="lead mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa facere quod at, nemo nesciunt molestiae accusantium in aliquam aspernatur nulla quis odit tempore reprehenderit, reiciendis amet eligendi illum? Quibusdam, qui.</p>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
					<div class="features-icons-icon d-flex">
						<i class="icon-layers m-auto text-primary"></i>
					</div>
					<h3>Bootstrap 4 Ready</h3>
					<p class="lead mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ullam fugit, repudiandae natus velit delectus sunt molestias iusto quasi ipsam! Minus a odit quo distinctio eligendi illum quidem animi. Repudiandae?</p>
					<p class="lead mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ullam fugit, repudiandae natus velit delectus sunt molestias iusto quasi ipsam! Minus a odit quo distinctio eligendi illum quidem animi. Repudiandae?</p>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="features-icons-item mx-auto mb-0 mb-lg-3">
					<div class="features-icons-icon d-flex">
						<i class="icon-check m-auto text-primary"></i>
					</div>
					<h3 class="mb-1">Easy to Use</h3>
					<p class="lead mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam consectetur pariatur et molestias, sequi dignissimos, iusto excepturi possimus ex ipsa laborum blanditiis, laudantium voluptate inventore aliquid ea ad aut ab?
					</p>
					<p class="lead mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam consectetur pariatur et molestias, sequi dignissimos, iusto excepturi possimus ex ipsa laborum blanditiis, laudantium voluptate inventore aliquid ea ad aut ab?
					</p>
					</div>
				</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import img_network from '@/assets/network.jpg'
export default {
	name: 'about',
	data() {
		return {
			img_network
		}
	},
	mounted() {
		let header = this.$refs.header
		header.style.background = `url('${img_network}')`
	}
}
</script>

<style scoped>
.container h2{
	font-family: Lato,'Helvetica Neue',Helvetica,Arial,sans-serif;
    font-weight: 700
}
.container h1 {
	font-size: 3rem;
	font-family: Lato,'Helvetica Neue',Helvetica,Arial,sans-serif;
    font-weight: 700
}

</style>
