
<script setup>
	import { ref, defineProps } from 'vue'

	const props = defineProps(['product'])
	const product = props.product

	// Supply is momenteel alleen een mock variabele
	const supply = 10
	
	const amount = ref(1)

</script>


<template>
	<v-container class="d-flex py-6">
		<v-row
			v-if="product"
			class="mx-auto"
		>
			<v-col
				cols="1"
				sm="6"
			>
					<v-img
						width="600"
						height="400"
						cover
						:src=product.imageUrl
					></v-img>
					
				<div class="product-description">
					<h2>Product Beschrijving</h2>
					<h3>{{ product.detail.description }}</h3>
				</div>
			</v-col>

			<v-col
				cols="1"
				sm="6"
			>
				<div class="product-title">
					<h1>{{ product.name }}</h1>
				</div>
				<div class="product-price">
					<p>€{{ product.price }}</p>
				</div>
				
				<v-select
					v-model="amount"
					label="Aantal"
					:items="Array.from({length: supply}, (_, i) => i + 1)"
				></v-select>

				<v-btn
					width="100%"
					outlined
					rounded
				>
					<v-icon>mdi-shopping</v-icon>
					Toevoegen 
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>


<style scoped>

.product-title {
	margin-left: 30px;
	margin-top: 50px;
	font-family: 'Akaya Kanadaka';
	color: rgb(100, 100, 100);
	font-weight: lighter;
	font-size: 14px;
}

.product-price {
	margin-left: 30px;
	margin-top: 50px;
	margin-bottom: 100px;
	font-family: 'Akaya Kanadaka';
	color: rgb(200, 100, 100);
	font-weight: 900;
	font-size: 32px;
}

.product-description {
	margin-top: 50px;
	margin-bottom: 80px;
	font-family: 'Akaya Kanadaka';
	color: rgb(100, 100, 100);
	font-size: 14px;
}

</style>