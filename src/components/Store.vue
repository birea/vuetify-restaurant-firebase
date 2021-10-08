<template>
	<v-container fluid  grid-list-xl>
		<br>
			<v-layout row wrap justify-center>
				<v-flex sm6 md3 lg3 v-for="(prod, idx) in menuList" :key="prod.id">
						<app-menu-item :item="prod" :key="idx" :uid="user" :name="prod.menuName" ></app-menu-item>
				</v-flex>
			</v-layout>
	</v-container>
</template>

<script>
	import { ref, auth } from '../config/firebase'
	import StoreItem from './StoreItem.vue'

	export default{
		components: {
			appMenuItem: StoreItem
		},
		data(){
			return{
				displayList: true,
				uid: ''
			}
		},
		firebase: {
			menuList: ref.child('Menu')
		},
		computed: {
			user(){
				return this.$store.getters.user
			}
		}
//		},
//		created(){
//			var vm = this;
//			ref.child('Menu').once('value', snapshot => {
//				vm.products = snapshot.val()
//				var key = Object.keys(snapshot.val())
//				console.log(key)
//			})
//			console.log(this.products)
//		}
	}
</script>

<style scoped>

</style>
