<template>
	<v-container fluid>
		<v-card>
			<v-card-title>
				<h3>Branch</h3>
			</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="branchName"
					name="Name"
					label="Name"
					type="text"
					required
				></v-text-field>
				<v-text-field
					v-model="location"
					name="location"
					label="Location"
					type="text"
					multi-line
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
			</v-card-text>
			<v-btn block primary light @click.native.prevent="submitBranch">Submit</v-btn>
		</v-card>
	</v-container>
</template>


<script>
	import { ref } from '../config/firebase'
	
	export default{
		data(){
			return{
				branchName: '',
				location: '',
				descript: ''
			}
		},
		methods: {
			submitBranch(){
				if(this.branchName && this.location && this.descript != ''){
					var vm = this;
					ref.child('branches').child(this.branchName).set({
						location: vm.location,
						descript: vm.descript
					})
					alert('Success')
					this.$router.push({ name: 'View' })
				}else{
					alert('Please fulfil the fields')
				}
			}
		}
	}
</script>


<style>


</style>
