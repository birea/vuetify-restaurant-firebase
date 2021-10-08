<template>
    <v-container>
        <div v-if="user">
            <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <br>
                        <v-card-title>
                            <h4 class="primary--text">Profile</h4>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field v-model="firstName" name="firstName" label="firstName" type="text" required></v-text-field>
                            <v-text-field v-model="lastName" name="lastName" label="lastName" type="text" required></v-text-field>
                            <v-text-field v-model="phone" name="phone" label="Phone" type="number"></v-text-field>
                            <v-text-field v-model="address" name="address" label="Address" type="text" multi-line></v-text-field>
                            <v-layout wrap>
                                <v-flex xs2>
                                    <v-subheader>Status: </v-subheader>
                                </v-flex>
                                <v-flex xs10>
                                    <div v-if="isMember">
                                        <v-chip outline color="green">Member</v-chip>
                                    </div>
                                    <div v-else>
                                        <v-chip outline color="green">Pending Member</v-chip>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout wrap>
                                <v-flex xs2>
                                    <v-subheader>Receipt: </v-subheader>
                                </v-flex>
                                <v-flex xs10>
                                    <div v-if="isOrdered">
                                        <v-chip outline color="green">Yes</v-chip>
                                    </div>
                                    <div v-else>
                                        <v-chip outline color="green">No</v-chip>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout wrap>
                                <v-flex>
                                    <v-subheader>
                                        <p>Point: {{calPoint}}</p>
                                    </v-subheader>
                                </v-flex>
                            </v-layout>
                            <v-btn block primary light class="white--text" @click.native.prevent="update">Update</v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import {
        ref
    } from '../config/firebase'
    
    export default {
        data() {
            return {
                firstName: '',
                lastName: '',
                phone: 0,
                address: '',
                isMember: false,
                isOrdered: false,
                point: 0
            }
        },
        created() {
            var vm = this;
            ref.child('users').child(this.user).on('value', snapshot => {
                var snap = snapshot.val()
                console.log(snap)
                vm.firstName = snap.firstName,
                vm.lastName = snap.lastName,
                vm.phone = snap.phone,
                vm.isMember = snap.isMember,
                vm.isOrdered = snap.isOrdered,
                vm.address = snap.address
            })

        if(this.isMember){
            if (this.isOrdered) {
                console.log('Ordered')
                ref.child('Transactions').child(this.user).on('value', snapshot => {
                    var snap = snapshot.val()
                    vm.point = Object.values(snap).length
                })
            }
        }
        },
        mouted() {
            var vm = this
            
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            calPoint() {
                 this.point = this.point * 10
                return this.point
            }
        },
        methods: {
            update() {
                var vm = this
                ref.child('users').child(this.user).update({
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    phone: vm.phone,
                    address: vm.address
                }).then(() => {
                    alert('Successfully updated')
                }).catch(err => {
                    alert(err)
                })
            }
        }
    }
</script>

<style>
    
</style>
