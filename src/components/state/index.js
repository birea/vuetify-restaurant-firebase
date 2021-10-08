import Vuex from 'vuex';
import Vue from 'vue';
import {ref, auth} from '../../config/firebase'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload){
            state.user = payload
        }
    },
    actions: {
        signUp({commit}, payload) {
            return new Promise((resolve, reject) => {
                auth.createUserWithEmailAndPassword(payload.email, payload.password).then(
                    user => {
                        const uid = user.uid
                        commit('setUser', uid)
                        resolve()
                    }
                ).catch(
                    err => {
                        reject(err)
                    }
                )    
            })     
        },
        signIn({commit}, payload) {
            return new Promise((resolve, reject) => {
                auth.signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                        const uid = user.uid
                        commit('setUser', uid)
                        resolve()
                    }
                ).catch(error => {
                    reject(error)
                })
            })
        },
        signOut({commit}) {
            return new Promise((resolve, reject) => {
                auth.signOut().then(() => {
                    commit('setUser', null)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        autoSign({commit}, payload) {
            commit('setUser', payload.uid)
        }
    },
    getters: {
        user (state){
            return state.user
        }
    }
})