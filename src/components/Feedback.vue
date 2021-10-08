<template>
	<v-container>
		<v-flex xs12 sm6 offset-sm3>
			<v-card>
				<v-card-title>
					<h3 class="primary--text">Feedback</h3>
				</v-card-title>
				<v-card-text>
					<p>Uid: {{user}}</p>
					<p>Name: {{ firstName }} {{ lastName }}</p>
					<v-select :items="branches" v-model="branch" ref="branch" label="Branch" required>
					</v-select>
					<v-text-field v-model="comment" name="comment" label="Comment" type="text" multi-line></v-text-field>
					<v-layout row wrap>
						<v-subheader>Food Quality:</v-subheader>
						<v-flex xs12>
							<br>
							<v-radio-group v-model="foodQuality" row>
								<v-radio label="Excellent" value="4"></v-radio>
								<v-radio label="Good" value="3" color="success"></v-radio>
								<v-radio label="Fair" value="2" color="warning"></v-radio>
								<v-radio label="Poor" value="1" color="error"></v-radio>
							</v-radio-group>
						</v-flex>
						<v-flex xs12>
							<div>
								<v-subheader>Service:</v-subheader>
								<v-flex xs12>
									<br>
									<v-radio-group v-model="service" row>
										<v-radio label="Excellent" value="4"></v-radio>
										<v-radio label="Good" value="3" color="success"></v-radio>
										<v-radio label="Fair" value="2" color="warning"></v-radio>
										<v-radio label="Poor" value="1" color="error"></v-radio>
									</v-radio-group>
								</v-flex>
							</div>
						</v-flex>
					</v-layout>
				</v-card-text>
				<v-btn block primary light @click.native.prevent="submitFeedback" class="white--text">Submit</v-btn>
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
				branches: [],
				branch: '',
				uid: '',
				comment: '',
				foodQuality: '',
				service: '',
				firstName: '',
				lastName: '',
				isOrdered: false
			}
		},
		created() {
			var self = this;
			ref.child('branches').on('value', snapshot => {
				var snap = snapshot.val();
				var key = Object.keys(snap);
				self.branches = key;
			})
	
			// auth.onAuthStateChanged(function(user) {
			// 	if (user) {
			// 		self.uid = user.uid;
	
			// 		var vm = self;
			// 		ref.child('users').child(user.uid).once('value', snapshot => {
			// 			var snap = snapshot.val()
			// 			vm.firstName = snap["firstName"]
			// 			vm.lastName = snap["lastName"]
			// 			vm.isOrdered = snap.isOrdered
			// 		})
			// 	} else {
			// 		vm.$router.push({
			// 			name: 'Register'
			// 		});
			// 	}
			// });
	
			if (this.user !== null) {
				var vm = this;
				ref.child('users').child(this.user).on('value', snapshot => {
					var snap = snapshot.val()
					vm.firstName = snap["firstName"]
					vm.lastName = snap["lastName"]
					vm.isOrdered = snap["isOrdered"]
					console.log('order' + vm.isOrdered)
				})
			} else {
				alert('Please sign in')
				this.$router.push({
					name: 'SignIn'
				})
			}
		},
		methods: {
			submitFeedback() {
					if (this.isOrdered) {
						var vm = this;
						ref.child('Feedback').child(this.branch).child(this.user).set({
							branch: vm.branch,
							comment: vm.comment,
							foodQuality: vm.foodQuality,
							service: vm.service
						}).then(() => {
							alert('Successfully submitted feedback')
							this.$router.push({
								name: 'View'
							})
						})
					} else {
						alert('No purchased found, cannot submit the feedback')
					}
	
			},
			update(val) {
				this.value = val
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
