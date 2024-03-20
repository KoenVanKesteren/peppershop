<script setup>
import FormComponent from '../components/FormComponent.vue'

const formConfig = {
	submitName: 'Inloggen',
	submit: 'login'
}
</script>


<template>
	<FormComponent :config="formConfig">
		<v-card-action>
			<div class="mx-4">
				<v-btn 
					block 
					to="/register"
				> 
					Registreren 
				</v-btn>
			</div>
		</v-card-action>
	</FormComponent>
</template>