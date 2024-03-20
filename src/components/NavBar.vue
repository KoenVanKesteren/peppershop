<script setup>
import { useRouter } from 'vue-router'
import store from '../store'

const router = useRouter()

const toAccount = () => {
	try {
		store.dispatch('fetchUserAccount')
	} catch (error) {
		console.log("Couldn't fetch User account", error)
	}
}
</script>


<template>
	<v-app-bar
		class="pa-4"
		dense
		fixed
		flat
	>
		<!-- De hamburger menu is nu puur mock element. Deze doet niets -->
		<v-app-bar-nav-icon	></v-app-bar-nav-icon>

		<v-toolbar-title>
			<v-btn @click="router.push('/')">
				<img 
					to="/"
					class="brand-image"
					src="@/assets/pepperflow-brand-shop-2.png"
				/>
			</v-btn>
		</v-toolbar-title>

		<v-text-field
			prepend-icon="mdi-magnify"
			hide-details
			rounded
			variant="outlined"
		>
			Zoek producten
		</v-text-field>

		<v-spacer></v-spacer>

		<v-btn 
			variant="outlined"
			size="small"
			to="/login"
		>
			Login
		</v-btn>

		<v-btn 
			icon
			@click="toAccount"
		>
			<v-icon>mdi-account-badge</v-icon>
		</v-btn>

		<!-- <v-btn icon>
			<v-icon>mdi-dots-vertical</v-icon>
		</v-btn> -->

	</v-app-bar>
</template>


<style scoped>

.brand-image {
	height: 30px;
}

</style>
