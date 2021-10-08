<template>
	<v-app>
		<v-navigation-drawer  :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher app>
			<v-list>
				<v-list-tile v-for="(item, i) in menuItem" :key="i" router :to="item.link">
					<v-list-tile-action>
						<v-icon> {{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title> {{ item.title}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	
		<v-toolbar fixed app :clipped-left="clipped">
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title class="primary--text">
				<router-link to="/" tag="span" style="cursor: pointer"><v-icon color="blue darken-2">tag_faces</v-icon> Halal Ju Ku</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn flat v-for="(item, i) in menuItem" :key="i" router :to="item.link">
				<v-icon>{{ item.icon }}</v-icon>
				{{ item.title }}
			</v-btn>
			<v-toolbar-title></v-toolbar-title>
	
			<!--
								      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
								        <v-icon>menu</v-icon>
								      </v-btn>
								-->
		</v-toolbar>
		<main>
			<v-content>
				<router-view></router-view>
			</v-content>
		</main>
		<!--
								    <v-navigation-drawer
								      temporary
								      :right="right"
								      v-model="rightDrawer"
								      app
								    >
								      <v-list>
								        <v-list-tile @click="right = !right">
								          <v-list-tile-action>
								            <v-icon>compare_arrows</v-icon>
								          </v-list-tile-action>
								          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
								        </v-list-tile>
								      </v-list>
								    </v-navigation-drawer>
								-->
		<v-footer :fixed="fixed" app>
			<span>&copy; 2017</span>
		</v-footer>
	</v-app>
</template>

<script>
	import {
		ref,
		auth
	} from './config/firebase'
	export default {
		data() {
			return {
				clipped: false,
				drawer: true,
				fixed: false,
				items: [{
					icon: 'bubble_chart',
					title: 'Inspire'
				}, {
					icon: '',
					title: 'Log in'
				}],
				miniVariant: false,
				right: true,
				rightDrawer: false,
				title: 'Vuetify.js',
				isLogin: false,
				menuItems: [{
						icon: 'face',
						title: 'Sign up',
						link: '/register'
					},
					{
						icon: 'lock_open',
						title: 'Sign in',
						link: '/login'
					},
					{
						icon: 'schedule',
						title: 'Reservation',
						link: '/reserve'
					},
					{
						icon: 'restaurant_menu',
						title: 'Store',
						link: '/store'
					},
					{
						icon: 'shopping_cart',
						title: 'Cart',
						link: '/shoppingCart'
					},
					{
						icon: 'list',
						title: 'Schedule',
						link: '/reserveList'
					},
					{
						icon: 'check_circle',
						title: 'Bill',
						link: '/bill'
					}
				],
				itemCart: 0
			}
		},
		created() {
			var self = this;
			// auth.onAuthStateChanged(user => {
			// 	var vm = self
			// 	if (user) {
			// 		vm.isLogin = true;
			// 		console.log('Login wow')
			// 	} else {
			// 		vm.isLogin = false;
			// 		console.log('Not Login oi')
			// 	}
			// });
		},
		computed: {
			user(){
				return this.$store.getters.user
			},
			menuItem() {
				let menuItems = [{
						icon: 'face',
						title: 'Sign up',
						link: '/register'
					},
					{
						icon: 'lock_open',
						title: 'Sign in',
						link: '/login'
					},
					{
						icon: 'restaurant_menu',
						title: 'Store',
						link: '/store'
					},
					{
						icon: 'shopping_cart',
						title: 'Cart',
						link: '/shoppingCart'
					}
				]
	
				if (this.user) {
					menuItems = [{
							icon: 'schedule',
							title: 'Reservation',
							link: '/reserve'
						}, {
							icon: 'restaurant_menu',
							title: 'Store',
							link: '/store'
						}, {
							icon: 'shopping_cart',
							title: 'Cart',
							link: '/shoppingCart'
						}, {
							icon: 'list',
							title: 'Schedule',
							link: '/reserveList'
						},
						{
							icon: 'check_circle',
							title: 'Bill',
							link: '/bill'
						},
						{
							icon: 'feedback',
							title: 'FeedBack',
							link: '/feedBack'
						},
						{
							icon: 'face',
							title: 'Profile',
							link: '/profile'
						},
						{
							icon: 'monetization_on',
							title: 'Coupon',
							link: '/exchange'
						},
						{
							icon: 'lock',
							title: 'Log Out',
							link: '/logOut'
						}
					]
				}
	
				return menuItems
			}
		}
	}
</script>
