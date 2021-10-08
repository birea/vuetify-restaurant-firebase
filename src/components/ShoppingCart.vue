<template>
	<v-container>
		<v-card>
			<table id="cart" class="table table-hover table-condensed">
			<thead>
				<tr>
					<th style="width:100%">Cart</th>
					<!-- <th style="width:10%">Price</th>
						<th style="width:10%">
							<span class="hidden-sm-and-down">Quantity</span>
							<span class="hidden-md-and-up">Quan.</span>
						</th> -->
				</tr>
			</thead>
			<div v-for="(item, key) in list">
				<v-layout row wrap>
					<app-cart-item :item="item" :eachKey="key" :uid="user"></app-cart-item>
				</v-layout>
			</div>
			<v-layout row wrap>
				<v-flex xs4 offset-sm6>
					<v-text-field v-model="address" label="Address" type="text" multi-line required></v-text-field>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs4 offset-sm6>
					<v-text-field v-model="discount" name="discount" label="Coupon" type="text"></v-text-field>
				</v-flex>
				<v-flex xs6 offset-sm6>
					<p>Total: {{ totalPrice }}</p>
				</v-flex>
				<v-flex v-if="isDiscount" xs6 offset-sm6>
					<v-chip label outline color="green">
						<v-icon left>monetization_on</v-icon>
						Discount: {{ discountValue }}
					</v-chip>
				</v-flex>
	
				
			</v-layout>
		</table>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn flat color="green"@click.prevent="submitCart">Submit</v-btn>
		</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
	import {
		ref,
		auth
	} from '../config/firebase'
	import CartItem from './CartItem.vue'
	import moment from 'moment'
	
	export default {
		data() {
			return {
				uid: '',
				list: [],
				discount: '',
				coupon: [],
				isDiscount: false,
				isMember: false,
				point: 0,
				inCoupon: [],
				inKey: [],
				address: ''
			}
		},
		components: {
			appCartItem: CartItem
		},
		created() {
			var vm = this;
	
			if (this.user !== null) {
				ref.child('users').child(this.user).on('value', snapshot => {
					var snap = snapshot.val()
					vm.isMember = snap.isMember,
					vm.address = snap.address
				})
	
				ref.child('Carts').child(this.user).on('value', snapshot => {
					var snap = snapshot.val()
					vm.list = snap
				})
	
				if (this.isMember == true) {
					var self = vm
					ref.child('Points').child(this.user).on('value', snapshot => {
						var snap = snapshot.val()
						self.point = snap.point
					})
				}
	
			} else {
				alert('Please Sign in')
				this.$router.push({
					name: 'SignIn'
				})
			}
	
			ref.child('Discounts').on('value', snapshot => {
				var snap = snapshot.val()
				vm.coupon = snap
			})

		},
		updated() {
		
	
	
		},
		computed: {
	
			totalPrice() {
				let total = 0
	
				for (var key in this.list) {
					total = parseFloat(this.list[key].price) * this.list[key].quantity + total
				}
	
	
				for (var key in this.coupon) {
					if (this.discount === key) {
						total = total * (100 - this.coupon[key].discount)/100
						this.isDiscount = true
					}
					else {
						this.isDiscount = false
					}
				}
	
				if (total < 0) {
					total = 0
				}
	
				return total
			},
			discountValue() {
				var discount = 0
				for (var key in this.coupon) {
					discount = this.coupon[key].discount
					console.log(this.discountVal)
				}
				return discount
			},
			user() {
				return this.$store.getters.user
			},
			toArr() {
				return Object.values(this.list)
			}
		},
		methods: {
			deleteItem(key) {
				ref.child('Carts').child(this.user).child(key).remove()
			},
			submitCart() {
				if (this.address !== '') {
					var vm = this
					ref.child('Carts').child(this.user).once('value', snap => {
						var newKey = ref.child('Transactions').child(this.user).push().key
						//					var updates = {}
						//					updates['/Transactions/' + this.uid + newKey] = snap.val()
						var self = vm
						ref.child('Transactions').child(this.user).child(newKey).child('list').set(snap.val(), error => {
							if (!error) {
								ref.child('Transactions').child(this.user).child(newKey).child('info').update({
									date: moment().format('L'),
									time: moment().format('LTS'),
									totalPrice: this.totalPrice,
									discount: this.isDiscount,
									address: this.address
								}).then(() => {
									// vm.point = vm.point * 10
									self.point = self.point + 10
									ref.child('Points').child(this.user).update({
										point: self.point
									})
									ref.child('Carts').child(this.user).remove()
								})
		
		
							} else {
								alert(error)
							}
						})
					})
					ref.child('users').child(this.user).update({
						isOrdered: true
					})
				}else{
					alert('You must assign address')
				}
				// } else {
				// 	alert('You must be a member, in order to make an order')
				// }
			}
		}
	}
	
	
	//					ref.child('Transactions').child(this.uid).push(snap.val(), error => {
	//						if(!error) {
	//							var date = new Date()
	//							ref.child('Transactions').child(this.uid).update({date: date.toLocaleDateString(), time: date.toLocaleTimeString(), totalPrice: this.totalPrice, discount: this.isDiscount})
	//							ref.child('Carts').child(this.uid).remove()
	//						}else {
	//							alert(error)
	//						}
	//					})
</script>

<style>
	
</style>
