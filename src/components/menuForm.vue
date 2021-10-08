<template>
	<v-container fluid>
		<v-layout>
			<v-flex sm6 offset-sm3>
				<v-card>
			<v-card-title>
				<h3>Menu Form</h3>
			</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="menuName"
					name="menuName"
					label="Menu Name"
					type="text"
					required
				></v-text-field>
				<v-text-field
					v-model="imgSrc"
					name="imgSrc"
					label="Image Source"
					type="text"
					required
				></v-text-field>
				<v-text-field
					v-model="descript"
					name="description"
					label="Description"
					type="text"
					multi-line
					required
				></v-text-field>
				<v-text-field
					v-model="price"
					name="price"
					label="Price"
					type="text"
					required
				></v-text-field>
			</v-card-text>
			<v-btn block primary light @click.native.prevent="submitMenu">Submit</v-btn>
		</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
	import { ref } from '../config/firebase'
	
	export default{
		data(){
			return{
				menuName: '',
				imgSrc: '',
				descript: '',
				price: ''
			}
		},
		methods: {
			submitMenu(){
				var vm = this;
				if(this.menuName && this.imgSrc && this.descript && this.price !== ''){
					ref.child('Menu').child(this.menuName).set({
						menuName: vm.menuName,
						imgSrc: vm.imgSrc,
						description: vm.descript,
						price: vm.price
					})
					alert('Successfully submitted')
				}
				else{
					alert('Please fulfil the form')
				}
			}
		}
	}
</script>


<style>

</style>