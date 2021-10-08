<template>
  <v-card class="grid">
    <router-link :to="'/store/' + item.menuName" tag="a">
      <v-card-media :src="item.imgSrc" height="250px">
      </v-card-media>
    </router-link>
    <v-card-title primary-title>
      <div class="headline">{{ item.menuName }}</div>
    </v-card-title>
    <v-card-text>
      <div>{{ shortDescription }}</div><br>
      <div>
        <p>Price: {{ item.price }}</p>
      </div>
    </v-card-text>
    <v-card-actions class="blue darken-1 mt-0">
      <v-spacer></v-spacer>
      <v-btn flat color="yellow" @click.prevent="addCart(name)">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
  import {
    ref
  } from '../config/firebase'
  
  export default {
    props: ['item', 'uid', 'name'],
    data() {
      return {
        quantity: 1
      }
    },
    methods: {
      addCart(menuName) {
        if (this.uid !== null) {
          var vm = this;
  
          ref.child('Carts').child(this.uid).child(this.name).set({
            name: vm.item.menuName,
            description: vm.item.description,
            price: vm.item.price,
            imgSrc: vm.item.imgSrc,
            quantity: vm.quantity
          })
          alert(this.name + ' has been added to your cart')
        }else {
          alert('Please Sigin in')
        }
  
      }
  
    },
    computed: {
      shortDescription() {
        // strip HTML tags first
        let desc = this.item.description.replace(/<(?:.|\n)*?>/gm, ' ');
        if (desc && desc.length > 100) {
          return `${desc.substring(0, 100)}...`;
        }
        return desc;
      },
    }
  }
</script>


<style scoped>
  
</style>
