
<script setup>
import { ref, defineProps } from 'vue'
import store from '../store'

const props = defineProps(['config'])
const config = props.config
const form = ref({
	email: '',
	password: '',
	remember: false
})

const isLoading = ref(false)

async function submit () {
	if (form.value.email === '') {
		return
	}

	isLoading.value = true

	try {
		const credentials = {
			email: form.value.email,
			password: form.value.password
		}

		await store.dispatch(config.submit, credentials)
		isLoading.value = false
	} catch(e) {
		console.log('Failed to ' + config.submit)
	}
}

const rules = {
	required: (value) => !!value || 'Required.',
	email: (value) => {
		const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return pattern.test(value) || 'Invalid e-mail.'
	}
}
</script>


<template>
	<v-container fluid>
		<v-overlay 
			:model-value="isLoading" 
			class="align-center justify-center"
		>
			<v-progress-circular
				v-if="isLoading"
				indeterminate
			></v-progress-circular>
		</v-overlay>

		<v-row justify="center">
			<v-col md="4">
				<v-card class="pa-4">
					<v-card-title class="text-center">Inloggen</v-card-title>
					<v-card-item>
						<v-form @submit.prevent="submit">
							<v-text-field
								prepend-inner-icon="mdi-email"
								:rules="[rules.required, rules.email]"
								v-model="form.email"
								label="Email"
							></v-text-field>

							<v-text-field
								type="password"
								:rules="[rules.required]"
								prepend-inner-icon="mdi-key"
								v-model="form.password"
								label="Wachtwoord"
							></v-text-field>

							<v-checkbox
								v-model="form.remember"
								label="Onthouden"
								hide-details
							></v-checkbox>

							<v-btn
								variant="outlined"
								type="submit"
								block
								class="mt-2"
							>
								{{ config.submitName }}
							</v-btn>
						</v-form>
					</v-card-item>
					<slot></slot>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>