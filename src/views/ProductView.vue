
<script setup>
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'
import store from '../store'
import DetailComponent from '../components/DetailComponent.vue'

const route = useRoute()
const { id } = route.params
const product = ref(store.getters.product(id))

onMounted(async () => {
	try {
		if (!product.value.detail) {
			const result = store.dispatch('fetchProductDetail', id)
			product.value.detail = result
		}
	} catch(error) {
		console.error("Couldn't fetch product detail: ", error)
	}
})

</script>


<template>
	<div class="container">
		<div class="page-header"></div>

		<div v-if="product && product.detail">
			<DetailComponent :product="product" />
		</div>
		<div v-else>
			<h1>Product not found!</h1>
		</div>
	</div>
</template>