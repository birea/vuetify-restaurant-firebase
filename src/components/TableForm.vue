<template>
	<v-container fluid>
		<v-card>
			<v-card-title>
				<h3>Discount Code</h3>
			</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="coupon"
					name="Coupon"
					label="Coupon Code"
					type="text"
					required
				></v-text-field>
				<v-text-field
					v-model="discount"
					name="Discount"
					label="Discount Price"
					type="number"
					required
				></v-text-field>
				<v-btn @click.prevent="submitDiscount">Submit</v-btn>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
	import { ref } from '../config/firebase'
	
	export default{
		data(){
			return{
				type: 0,
				status: true,
				tableNo: 0,
				table: '',
				coupon: '',
				discount: 0
			}
		},
		methods: {
			// submitTable(){
			// 	var vm = this;
			// 	ref.child('Tables').child(this.type).push({
			// 		tableNo: vm.tableNo,
			// 		status: vm.status
			// 	})
			// },
			// revert(status, key, keys){
			// 	if(status === true){
			// 		ref.child('Tables').child(keys).child(key).update({status: false})
			// 	}else{
			// 		ref.child('Tables').child(keys).child(key).update({status: true})
			// 	}
			// },
			submitDiscount(){
				var vm = this
				ref.child('Discounts').child(this.coupon).set({
					discount: vm.discount
				})
			}
		},
		created(){
			// var vm = this;
			// ref.child('Tables').on('value', snapshot => {
			// 	var snap = snapshot.val()
			// 	vm.table = snap
			// })
		}
	}
</script>


<style>

</style>