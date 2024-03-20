
<script setup>

import { onMounted,ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import store from '../store'
import ItemGrid from '../components/ItemGrid.vue'

const route = useRoute()
const router = useRouter()
const { id } = route.params
const products = ref(store.getters.productsByCategory(id))
const category = ref(store.getters.productCategory(id))

onMounted(async () => {
	try {
		if (!category.value.length > 0) {
			const result = await store.dispatch('fetchProductsByCategory', id)
			products.value = result
		}

		if (!category.value) {
			store.dispatch('fetchProductCategories')
		}
	} catch(error) {
		console.error("Couldn't fetch products: ", error)
	}
})

</script>


<template>
	<div class="container">

		<div class="page-header">
			<h1>{{ category.name }}</h1>
		</div>

		<div class="cards">
			<div v-if="products && products.length > 0">
				<ItemGrid :items="products">
					<template #item="{ id, name, price, imageUrl }">
						<div 
							class="pa-12"
							@click="router.push(`/product/${id}`)"
						>
							<v-card
								class="mx-auto"
								height="100"
								width="200"
								:image="imageUrl"
								variant="flat"
							/>
							<div class="item-title">
								<h1>{{name}}</h1>
							</div>
							<div class="item-price">
								<h1>€{{price}}</h1>
							</div>
						</div>
					</template>
				</ItemGrid>
			</div>
			<div v-else>
				<h1>Products not found!</h1>
			</div>
		</div>
	</div>
</template>


<style scoped>

.item-title {
	text-align:center;
	font-weight: lighter;
	font-family: 'Akaya Kanadaka';
	color: rgb(100, 100, 100);
	font-size: 10px;
	padding-top: 20px;
	line-height: 32px;
}

.item-price {
	text-align:center;
	font-weight: 900;
	font-family: 'Akaya Kanadaka';
	color: rgb(100, 100, 100);
	font-size: 12px;
	padding-top: 20px;
	line-height: 32px;
}

</style>