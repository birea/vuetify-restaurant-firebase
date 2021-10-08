<template>
	<v-container fluid>
		<v-card style="overflow: hidden;">
			<v-navigation-drawer permanent absolute style="z-index: 1">
				<v-list>
					<v-list-tile ripple v-for="(i, index) in snap.slice().reverse()" @click.prevent="listTransaction(i)">
						<v-list-tile-action>
							<v-icon left color="green">check_circle</v-icon>
						</v-list-tile-action>
						<v-list-tile-title>{{ i.info["date"] }}, {{ i.info["time"]}}</v-list-tile-title>
					</v-list-tile>
				</v-list>
	
			</v-navigation-drawer>
			<v-container fluid>
				<v-layout row wrap>
					<v-flex xs12 sm6 offset-sm4>
						<v-layout row wrap>
							<div v-if="clickedSnap.length !== 0">
								<v-card offset-sm3>
									<v-card-title>
										<div>
											<h3 class="primary--text">Bills</h3>
											<p>Date: {{ clickedSnap.info["date"] }}</p>
											<p>Time: {{ clickedSnap.info["time"] }}</p>
											<p>Total: {{ clickedSnap.info["totalPrice"] }} Baht</p>
											<p>Use Coupon: {{ clickedSnap.info["discount"] }}</p>
											<p>Address: {{clickedSnap.info["address"]}}</p>
										</div>
									</v-card-title>
	
									<app-bill-item :item="clickedSnap.list"></app-bill-item>
								</v-card>
							</div>
							<div v-else>
								<v-card>
									<v-card-title>
										<div>
											<h3 class="primary--text">Bills</h3>
											<p>Date: {{ latestTransaction.info["date"] }}</p>
											<p>Time: {{ latestTransaction.info["time"] }}</p>
											<p>Total: {{ latestTransaction.info["totalPrice"] }} Baht</p>
											<p>Use Coupon: {{ latestTransaction.info["discount"] }}</p>
											<p>Address: {{latestTransaction.info["address"]}}</p>
										</div>
									</v-card-title>
									<app-bill-item :item="latestTransaction.list"></app-bill-item>
								</v-card>
							</div>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-container>
</template>


<script>
	import {
		ref,
		auth
	} from '../config/firebase'
	import BillItem from './BillItem.vue'
	export default {
		data() {
			return {
				uid: '',
				snap: [],
				pushKey: '',
				clickedSnap: [],
				info: []
			}
		},
		components: {
			appBillItem: BillItem
		},
		created() {
			var vm = this;
			// auth.onAuthStateChanged(function(user) {
			// 	if (user) {
			// 		ref.child('Transactions').child(user.uid).child('list').on('child_added', snapshot => {
			// 			var snapValue = snapshot.val()
			// 			vm.snap.push(snapValue)
			// 		})
			// 	}
			// })
			// console.log(this.clickedSnap)
	
			if (this.user !== null) {
				ref.child('Transactions').child(this.user).on('child_added', snapshot => {
					var snapValue = snapshot.val()
					vm.snap.push(snapValue)
				})
			}
	
		},
		computed: {
			latestTransaction() {
				return this.snap[this.snap.length - 1]
			},
			user() {
				return this.$store.getters.user
			},
			test(){
				
				return this.snap
			}
		},
		methods: {
			listTransaction(list) {
				this.clickedSnap = list
			}
		}
	}
</script>


<style>
	
</style>