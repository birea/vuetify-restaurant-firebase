<template>
	<v-container>
		<v-card >
			<v-layout row wrap>
			<v-flex class="text-xs-center">
				<br>
				<h4 class="primary--text">Reserve The Table</h4>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-flex xs12 sm6 offset-sm3>
				<div>
					<br>	
						<h5>Name: {{ firstName }} {{ lastName }}</h5>					
					<v-text-field name="phone" v-model="phone" label="Phone" type="number" required></v-text-field>
				</div>
				<v-select :items="branches" v-model="branch" ref="branch" label="Branch" required>
				</v-select>
				<v-text-field name="table" v-model="seats" label="Number of seats" type="number" required>
				</v-text-field>
			</v-flex>
		</v-layout>
		<br>
		<v-layout row wrap>
			<v-flex xs12 sm6 offset-sm3>
				<v-date-picker class="hidden-sm-and-down" v-model="date" landscape></v-date-picker>
			</v-flex>
			<v-flex xs12 sm6 offset-xs2 offset-sm3 offset-md3>
				<v-date-picker class="hidden-md-and-up" v-model="date"></v-date-picker>
			</v-flex>
		</v-layout>
		<br>
		<v-layout row wrap>
			<v-flex xs12 sm6 offset-sm3>
				<v-time-picker class="hidden-sm-and-down" v-model="time" landscape></v-time-picker>
			</v-flex>
			<v-flex xs12 sm6 offset-xs2 offset-sm3 offset-md3>
				<v-time-picker class="hidden-md-and-up" v-model="time"></v-time-picker>
			</v-flex>
			<br>
		</v-layout>
		<v-card-actions>
			<v-spacer></v-spacer>
				<v-btn flat color="green"  @click.native.prevent="submitReserve">Submit</v-btn>
		</v-card-actions>
			
		</v-card>
		
	
		<!-- <v-layout>
					<v-layout row wrap align-center>
						<v-flex class="text-xs-center">
							<h3>No data</h3>
						</v-flex>
					</v-layout>
				</v-layout> -->
	
	
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
				date: null,
				time: null,
				branches: [],
				branch: '',
				firstName: '',
				lastName: '',
				uid: '',
				seats: 0,
				type: 4,
				phone: '',
				exist: false
			}
		},
		created() {
			var vm = this;
	
			// auth.onAuthStateChanged(function(user) {
			// 	if (user) {
			// 		self.uid = user.uid;
			// 		console.log(user.uid)
			// 		var vm = self;
			// 		ref.child('users').child(user.uid).once('value', snapshot => {
			// 			var snap = snapshot.val()
			// 			console.log(snap)
			// 			vm.firstName = snap["firstName"]
			// 			vm.lastName = snap["lastName"]
			// 			vm.phone = snap["phone"]
			// 			vm.exist = true
			// 		})
			// 	} else {
			// 		// alert('Please sign in')
			// 		self.$router.push({
			// 			name: 'SignIn'
			// 		});
			// 	}
			// });
			ref.child('branches').once('value', snapshot => {
				var snap = snapshot.val();
				var key = Object.keys(snap);
				console.log(key)
				vm.branches = key;
			})
	
			if (this.user !== null) {
				console.log('user')
				ref.child('users').child(this.user).once('value', snapshot => {
					var snap = snapshot.val()
					console.log(snap)
					vm.firstName = snap["firstName"]
					vm.lastName = snap["lastName"]
					vm.phone = snap["phone"]
				})
			}
		},
		methods: {
			submitReserve() {
				var vm = this;
	
				ref.child('Reserves').child(this.user).push({
					date: vm.date,
					time: vm.time,
					branch: vm.branch,
					seats: vm.seats,
					firstName: vm.firstName,
					lastName: vm.lastName,
					phone: vm.phone
				}).then(() => {
					alert('Successfully submitted Reserved')
				})
	
			}
		},
		computed: {
			user() {
				return this.$store.getters.user
			}
		}
	}
</script>


<style>
	
</style>
