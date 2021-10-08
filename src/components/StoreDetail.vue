<template>
	<v-container>
		<br>
		<v-flex xs12 sm6 offset-sm3>
			<v-card>
			<v-card-title>
				<v-flex xs6>
					<h4>{{ name }}</h4>
				</v-flex>
				<v-flex xs6>
					<v-chip color="green" outline label>฿{{ price }}</v-chip>
				</v-flex>
			</v-card-title>
			<v-container fluid>
			<v-layout row wrap>
				<v-flex class="text-xs-center" xs12>
					<img :src="imgSrc" alt="" width="200px">
				</v-flex>
				<v-card-title>
					<p>Description: {{ description}}</p>
				</v-card-title>
				<v-flex xs12 offset-md8>
					<v-spacer></v-spacer>
					<v-btn primary light @click.prevent="addCart" class="white--text">Add to cart</v-btn>
				</v-flex>
			</v-layout>
			</v-container>
			
		</v-card>
		</v-flex>
	</v-container>
</template>


<script>
	import {
		ref,
		auth
	} from '../config/firebase'
	
	export default {
		data() {
			return {
				name: '',
				description: '',
				price: '',
				imgSrc: '',
				uid: '',
				isMember: false,
				quantity: 1
			}
		},
		//		firebase: {
		//			selectedMenu: ref.child('Menu').child(this.paramId)
		//		},
		computed: {
			user() {
				return this.$store.getters.user
			}
		},
		created() {
			let id = this.$route.params.id
			var vm = this
			ref.child('Menu').child(id).once('value', snapshot => {
				let snap = snapshot.val()
				vm.name = snap.menuName,
					vm.description = snap.description,
					vm.price = snap.price,
					vm.imgSrc = snap.imgSrc
			})
	
			// auth.onAuthStateChanged(function(user) {
			// 	if (user) {
			// 		self.uid = user.uid
			// 	}
			// })
		},
		methods: {
			addCart() {
				if (this.user !== null) {
					var vm = this;
					// console.log(this.quantity)
					ref.child('Carts').child(this.user).child(this.name).set({
						name: vm.name,
						description: vm.description,
						price: vm.price,
						imgSrc: vm.imgSrc,
						quantity: vm.quantity
					}).then(() => {
						alert(this.name + ' has been added to your cart')
					}).catch(err => {
						alert(err)
					})
				} else {
					alert('Please Sign in')
				}
	
			},
			update(val) {
				this.value = value
			}
		}
	
	}
</script>


<style>
	
</style>
