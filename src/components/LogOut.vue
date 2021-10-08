<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex class="text-xs-center">
                <v-progress-circular indeterminate v-bind:size="50" color="primary"></v-progress-circular>
            </v-flex>
        </v-layout>
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
    
            }
        },
        computed: {
            user(){
                return this.$store.getters.user
            }
        },
        created() {
            // self = this;
            // auth.onAuthStateChanged(function(user) {
            //     if (user) {
            //         auth.signOut()
            //         alert('Signed')
            //     } else {
            //         alert('Please login first')
            //         self.$router.push({
            //             name: 'HomePage'
            //         })
            //     }
            // })
            
            if(this.user !== null){
                var vm = this
                // auth.signOut().then( () => {
                //     alert('Sign Out')
                // }).catch(err => {
                //     alert(err)
                // })
                this.$store.dispatch('signOut').then( () => {
                    alert('Sign Out')
                    vm.$router.push({
                        name: 'HomePage'
                    })
                    
                }).catch( err => {
                    alert(err)
                })
            }else{
                this.$router.push({
                    name: 'SignIn'
                })
            }
        }
    }
</script>

<style>
    
</style>

     