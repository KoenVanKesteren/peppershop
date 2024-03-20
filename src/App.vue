<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

</script>

<template>
	<v-app>

		<NavBar	/>

		<v-main>
			<v-container fluid>
				<v-fade-transition>
					<RouterView />
				</v-fade-transition>
			</v-container>
		</v-main>
	</v-app>
</template>