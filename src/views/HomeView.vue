<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store'
import ItemRow from '../components/ItemRow.vue'

const router = useRouter()
const productCategories = ref(store.getters.productCategories)
const productCategoryValues = computed(() => productCategories.value)

onMounted(async () => {
	try {
		if (!productCategories.value.length > 0) {
			store.dispatch('fetchProductCategories')
		}
	} catch(error) {
		console.error("Couldn't fetch product categories: ", error)
	}
})

</script>


<template>
	<main class="container">

		<div class="page-header">
			<h1>Ons Assortiment</h1>
		</div>

		<div v-if="productCategoryValues.length > 0">
			<ItemRow :items="productCategoryValues">
				<template #item="{ id, name, imageUrl }">
					<div 
						class="pa-12" 
						@click="router.push(`/category/${id}`)"
					>
						<v-card
							class="mx-auto rounded-card"
							height="120"
							width="120"
							:image="imageUrl"
							variant="flat"
						/>
						<v-spacer></v-spacer>
						<div class="category-item-title">
							<h1>{{name}}</h1>
						</div>
					</div>
				</template>
			</ItemRow>

			<div class="carousel-container">
				<v-carousel>
					<v-carousel-item
						v-for="item in productCategoryValues"
						:key="item.id"
						:src="item.imageUrl"
						cover
					></v-carousel-item>
				</v-carousel>
			</div>
		</div>
	</main>
</template>


<style scoped>

.category-item-title {
	text-align:center;
	font-weight: lighter;
	font-family: 'Akaya Kanadaka';
	color: rgb(100, 100, 100);
	font-size: 10px;
	padding-top: 20px;
	line-height: 32px;
}

.rounded-card {
	border-radius:80px;
}

</style>
