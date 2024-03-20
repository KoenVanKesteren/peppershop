<script setup>
import FormComponent from '../components/FormComponent.vue'

const formConfig = {
	submitName: 'registreren',
	submit: 'register'
}

</script>


<template>
	<FormComponent :config="formConfig" />
</template>