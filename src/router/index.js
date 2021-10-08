import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register.vue'
import Feedback from '../components/Feedback.vue'
import View from '../components/View.vue'
import Branch from '../components/Branch.vue'
import HomePage from '../components/Home.vue'
import Reserve from '../components/Reserve.vue'
import MenuForm from '../components/menuForm.vue'
import Store from '../components/Store.vue'
import StoreDetail from '../components/StoreDetail.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import SignIn from '../components/SignIn.vue'
import Bill from '../components/Bill.vue'
import TableForm from '../components/TableForm.vue'
import ReserveList from '../components/ReserveList.vue'
import LogOut from '../components/LogOut.vue'
import Profile from '../components/Profile.vue'
import Exchange from '../components/Exchange.vue'


Vue.use(Router)

export const routes = [
	{
		path: '/Home',
		name: 'HomePage',
		component: HomePage
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
    },
	{
		path: '/view',
		name: 'View',
		component: View
	},
	{
		path: '/feedback',
		name: 'Feedback',
		component: Feedback
	},
	{
		path: '/branch',
		name: 'Branch',
		component: Branch
	},
	{
		path: '/reserve',
		name: 'Reserve',
		component: Reserve
	},
	{
		path: '/menuForm',
		name: 'MenuForm',
		component: MenuForm
	},
	{
		path: '/store',
		name: 'Store',
		component: Store
	},
	{
		path: '/store/:id',
		name: 'StoreDetail',
		component: StoreDetail
	},
	{
		path: '/shoppingCart',
		name: 'ShoppingCart',
		component: ShoppingCart
	},
	{
		path: '/login',
		name: 'SignIn',
		component: SignIn
	},
	{
		path: '/bill',
		name: 'Bill',
		component: Bill
	},
	{
		path: '/tableForm',
		name: 'TableForm',
		component: TableForm
	},
	{
		path: '/reserveList',
		name: 'ReserveList', 
		component: ReserveList
	},
	{
		path: '/logOut',
		name: 'LogOut',
		component: LogOut
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile
	},
	{
		path: '/exchange',
		name: 'Exchange',
		component: Exchange
	},
	{
		path: '*',
		redirect: '/Home'
	}
]
