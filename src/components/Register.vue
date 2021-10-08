<template>
	<v-container fluid>
		<br>
		<v-flex xs12 sm6 offset-sm3>
			<v-form ref="form" lazy-validation>
				<v-card>
					<v-card-title>
						<h4 class="primary--text">Registration</h4>
					</v-card-title>
					<v-card-text>
						<br>
						<v-text-field v-model="form.email" name="email" label="Email" type="email" :rules="[rules.required, rules.email]" required></v-text-field>
						<v-text-field v-model="form.password" name="password" min="8" :append-icon="e1 ? 'visibility_off' : 'visibility'" 
						:rules="[
							() => !!form.password || 'This field is required',
							() => !!form.password && form.password.length >= 8 || 'Password must be less than 8 characters'
						]"
						 :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" hint="At least 8 characters" ref="password" label="Password" required></v-text-field>
						<v-text-field v-model="form.firstName" name="firstName" label="firstName" type="text" ref="firstName" :rules="[() => !!form.firstName || 'This field is required']" required></v-text-field>
						<v-text-field v-model="form.lastName" name="lastName" label="lastName" type="text" ref="lastName" :rules="[() => !!form.lastName || 'This field is required']" required></v-text-field>
						<v-text-field v-model="form.phone" name="phone" label="Phone No" :mask="mask"></v-text-field>
						<v-text-field v-model="form.address" name="address" type="text" label="Address" ref="address" :rules="[() => !!form.address || 'This field is required']" required multi-line>
	
						</v-text-field>
	
					</v-card-text>
					<v-card-actions>
						<v-btn flat color="blue" @click.prevent="resetAll">Reset</v-btn>
						<v-spacer></v-spacer>
						<v-btn flat color="green" :disabled="!formIsValid" @click.native.prevent="loginWithEmailLocal">Sign Up</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-flex>
	</v-container>
</template>


<script>
	import {
		auth,
		ref,
		firebase
	} from '../config/firebase'
	
	export default {
		data() {
			const defaultForm = Object.freeze({
				firstName: '',
				email: '',
				password: '',
				lastName: '',
				phone: '',
				address: ''
			})
			return {
				form: Object.assign({}, defaultForm),
				// email: '',
				// password: '',
				// firstName: '',
				// lastName: '',
				// phone: '',
				isMember: true,
				isOrdered: false,
				mask: 'phone',
				// address: '',
				rules: {
					required: (value) => !!value || 'Required.',
					email: (value) => {
						const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						return pattern.test(value) || 'Invalid e-mail.'
					}
				},
				e1: true,
				defaultForm
			}
		},
		computed: {
			user() {
	
				return this.$store.getters.user;
			},
			validate() {
				return this.$refs.form.validate();
			},
			formIsValid() {
				return (
					this.form.firstName &&
					this.form.lastName &&
					this.form.address &&
					this.form.email &&
					this.form.password
				)
			}
		},
		methods: {
			resetAll() {
				this.$refs.form.reset()
			},
			loginWithEmailLocal() {
				// if (this.firstName && this.lastName && this.phone != '') {
				// 	var self = this;
				// 	 auth.createUserWithEmailAndPassword(this.email, this.password)
				// 	.then(function(value) {
				// 		console.log('Success')
				// 		var vm = self;
				// 		auth.onAuthStateChanged(function(user) {
				// 			if (user) {
				// 				console.log('uid: ' + user.uid)
				// 				ref.child('users').child(user.uid).set({
				// 					firstName: vm.firstName,
				// 					lastName: vm.lastName,
				// 					phone: vm.phone,
				// 					isMember: vm.isMember,
				// 					isOrdered: vm.isOrdered
				// 				})
				// 				vm.$router.push({
				// 					name: 'View'
				// 				});
				// 			} else {
				// 				console.log('no user')
				// 			}
				// 		});
				// 	})
				// 	.catch(function(error) {
				// 		var errorCode = error.code;
				// 		var errorMessage = error.message;
				// 		console.log(errorCode)
				// 		console.log(errorMessage)
				// 		alert(errorCode)
				// 	})
				// } else {
				// 	alert('Please fullfil the fields')
				// }
				var vm = this;
				if (this.$refs.form.validate()) {
					this.$store.dispatch('signUp', {
							email: this.email,
							password: this.password
						})
						.then(() => {
							ref.child('users').child(this.user).set({
								firstName: vm.firstName,
								lastName: vm.lastName,
								phone: vm.phone,
								isMember: vm.isMember,
								isOrdered: vm.isOrdered,
								address: vm.address
							})
							alert('Successfuly register')
							vm.$router.push({
								name: 'HomePage'
							})
						}).catch(error => {
							alert(error)
						})
				} else {
					alert('Please fulfil')
				}
			}
		}
	}
</script>


<style>
	
</style>
