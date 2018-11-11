<template>
	<div class="container">
		<h1 class="my-4">Registra el nuevo enlace</h1>
		<form class="well form-horizontal mt-5">
			<fieldset>
				<div class="form-group">
				<label class="col-md-4 control-label">Titulo</label>
				<div class="col-md-8 inputGroupContainer">
					<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span><input id="titulo" name="titulo" placeholder="Nombre del enlace" class="form-control" required="true" value="" type="text"></div>
				</div>
				</div>
				<div class="form-group">
				<label class="col-md-4 control-label">Url</label>
				<div class="col-md-8 inputGroupContainer">
					<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span><input id="address" name="address" placeholder="Dirreción del enlace" class="form-control" required="true" value="" type="text"></div>
				</div>
				</div>
				<div class="form-group">
				<label class="col-md-4 control-label">Descripción</label>
				<div class="col-md-8 inputGroupContainer">
					<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span><textarea id="description" name="state" placeholder="Describe el sitio" class="form-control" rows="3" required="true" value="" type="text"></textarea> </div>
				</div>
				</div>
				<!--
				<div class="form-group">
				<label class="col-md-4 control-label">Postal Code/ZIP</label>
				<div class="col-md-8 inputGroupContainer">
					<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span><input id="postcode" name="postcode" placeholder="Postal Code/ZIP" class="form-control" required="true" value="" type="text"></div>
				</div>
				</div>
				<div class="form-group">
				<label class="col-md-4 control-label">Country</label>
				<div class="col-md-8 inputGroupContainer">
					<div class="input-group">
						<span class="input-group-addon" style="max-width: 100%;"><i class="glyphicon glyphicon-list"></i></span>
						<select class="selectpicker form-control">
							<option>A really long option to push the menu over the edget</option>
						</select>
					</div>
				</div>
				</div>
				<div class="form-group">
				<label class="col-md-4 control-label">Email</label>
				<div class="col-md-8 inputGroupContainer">
					<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span><input id="email" name="email" placeholder="Email" class="form-control" required="true" value="" type="text"></div>
				</div>
				</div>
				<div class="form-group">
				<label class="col-md-4 control-label">Phone Number</label>
				<div class="col-md-8 inputGroupContainer">
					<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span><input id="phoneNumber" name="phoneNumber" placeholder="Phone Number" class="form-control" required="true" value="" type="text"></div>
				</div>
				</div>
				-->
			</fieldset>
		</form>

	</div>
</template>

<script>
export default {
    name: 'publicar'
}
</script>

<style>
.container h1{
	text-align: center;
}
.well{
	min-height: 20px; 
	padding: 19px; 
	margin-bottom: 20px; 
	background-color: #f5f5f5; 
	border: 1px solid #e3e3e3; 
	border-radius: 4px; 
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05); 
	box-shadow: inset 0 1px 1px rgba(0,0,0,.05); 
}

</style>
