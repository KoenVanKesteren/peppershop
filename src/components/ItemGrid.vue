
<script setup>
import { defineProps } from 'vue'
const props = defineProps(['items'])
const items = props.items
</script>


<template>
	<v-container>
		<v-row no-gutters>
			<v-col
				v-for="item in items" 
				:key="item.id"
				class="mx-auto"
				cols="12"
				sm="4"
			>
				<v-sheet class="ma-2 pa-2">
					<slot 
						name="item" 
						v-bind="item"
					>
					</slot>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>
