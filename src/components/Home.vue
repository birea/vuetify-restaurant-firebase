<template>
	<v-container fluid>
		<v-flex xs12 sm6 offset-sm3>
			<br>
			<h3 class="primary--text text-xs-center">Home Page</h3>
			<br>
			<v-carousel>
   				<v-carousel-item v-for="(item,i) in items" v-bind:src="item.imgSrc" :key="i"></v-carousel-item>
 			</v-carousel>
		</v-flex>
	</v-container>
</template>

<script>
	import { ref } from '../config/firebase'
	export default{
		data(){
			return{
				items: []
			}
		},
		created(){
			var vm = this
			ref.child('Menu').on('value', snapshot => {
				vm.items = snapshot.val()
			})
			
		}
	}
</script>


<style>

</style>