<template>
	<v-container fluid>
		<v-layout>
			<v-flex>
				<br>
				<h3>JSON STRUCTURE INSIDE FIREBASE</h3>
				<hr>
				<br>
				<pre>{{ database }}</pre>
			</v-flex>
		</v-layout>
	</v-container>
	
</template>


<script>
	import  {
		ref
	} from '../config/firebase'

	export default {
		data() {
			return {
				database: ''
			}
		},
		created() {
			var vm = this;
			ref.on('value', snap => {
				vm.database = snap.val()
			})
		}
	}

</script>


<style>


</style>
