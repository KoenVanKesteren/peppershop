
<script setup>
const props = defineProps(['items'])
const items = props.items
</script>


<template>
	<v-sheet class="d-flex py-6">
		<div
			v-for="item in items" 
			:key="item.id"
			class="mx-auto"
		>
			<slot 
				name="item" 
				v-bind="item"
			>
			</slot>
		</div>
	</v-sheet>
</template>
