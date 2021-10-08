<template>
    <v-container>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-card-title>
                    <h4 class="primary--text">Exchange Point</h4>
                </v-card-title>
                <v-card-text>
                    <v-chip outline color="green">Point Available: {{point}}</v-chip>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3>
            <br>
            <v-card>
                <v-card-title>
                    <h5>15% discount coupon <small>(required 100 point)</small></h5>
                </v-card-title>
                <v-card-action>
                    <v-divider></v-divider>
                    <v-btn flat color="orange" @click.prevent="saveOptionOne">Activate</v-btn>
                </v-card-action>
            </v-card>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3>
            <br>
            <v-card>
                <v-card-title>
                    <h5>5% discount coupon <small>(required 50 point)</small></h5>
                </v-card-title>
                <v-card-action>
                    <v-divider></v-divider>
                    <v-btn flat color="orange" @click.prevent="saveOptionTwo">Activate</v-btn>
                </v-card-action>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    import {
        ref
    } from '../config/firebase'
    
    
    export default {
        data() {
            return {
                point: 0,
                firstName: '',
                lastName: '',
                isMember: false,
                lists: []
            }
        },
        created() {
            var vm = this
            ref.child('Points').child(this.user).on('value', snapshot => {
                var snap = snapshot.val()
                console.log(snap)
                vm.point = snap["point"]
            })
    
            ref.child('users').child(this.user).on('value', snapshot => {
                var snap = snapshot.val()
                vm.firstName = snap["firstName"]
                vm.lastName = snap["lastName"]
                vm.isMember = snap["isMember"]
            })
    
            ref.child('Discounts').on('value', snapshot => {
                var snap = snapshot.val()
                vm.lists = snap
            })
        },
        computed: {
            user() {
                return this.$store.getters.user
            }
        },
        methods: {
            saveOptionOne() {
                if (this.point >= 100) {
    
                    var Key = ref.child('Discounts').push().key;
                    var newKey = 'GEN'.concat(Key)
                    ref.child('Discounts').child(newKey).set({
                        discount: 15
                    }).then(() => {
                        this.point -= 100
                        ref.child('Points').child(this.user).update({
                            point: this.point
                        })
                    })
                    prompt("Please press ctrl+c to copy the coupon below", newKey)
    
                } else {
                    alert('Insufficient point')
                }
            },
            saveOptionTwo() {
                if (this.point >= 50) {
    
                    var Key = ref.child('Discounts').push().key;
                    var newKey = 'GEN'.concat(Key)
                    ref.child('Discounts').child(newKey).set({
                        discount: 5
                    }).then(() => {
                        this.point -= 50
                        ref.child('Points').child(this.user).update({
                            point: this.point
                        })
                    })
                     prompt("Please press ctrl+c to copy the coupon below", newKey)
    
    
                } else {
                    alert('Insufficient point')
                }
            }
        }
    }
</script>

<style>
    
</style>
