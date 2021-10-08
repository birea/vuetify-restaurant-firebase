<template>
	<v-container>
		<v-layout row>
			<v-flex xs3 class="hidden-xs-only ma-3 text-xs-center">
				<img :src="item.imgSrc" alt=""  width="200px">
			</v-flex>
			<v-flex xs2 class="ma-1">
				<v-subheader>
					{{ item.name }} 
				</v-subheader>
			</v-flex>
			<v-flex xs2 class="ma-1">
				<v-chip outline color="green">Price: {{ item.price }}</v-chip>
			</v-flex>
			<v-flex xs1 class="ma-1">
				<v-text-field v-model="item.quantity" name="quantity" label="Quantity" type="number"></v-text-field>
			</v-flex>
			<v-flex xs2 class="ma-1">
					Subtotal: {{ subTotal(item.quantity, item.price) }} baht
			</v-flex>
			<v-flex xs3>
				<v-btn @click.prevent="deleteItem(eachKey)">Remove</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
	import {
		ref
	} from '../config/firebase'
	
	export default {
		props: ['item', 'eachKey', 'uid'],
		// mounted() {
		// 	console.log(this.eachKey)
		// 	ref.child('Carts').child(this.uid).child(this.eachKey).update({quantity: this.item.quantity})
		// },
		data(){
			return{
				
			}
		},
		updated() {
			ref.child('Carts').child(this.uid).child(this.eachKey).update({
				quantity: this.item.quantity
			})
		},
		methods: {
			deleteItem(key) {
				ref.child('Carts').child(this.uid).child(key).remove()
			},
			subTotal(quantity, price) {
				return quantity * price
			}
		},
		computed: {
			toArr(){
				return Object.values(this.item)
			}
		}
	}
</script>


<style>
	
</style>
