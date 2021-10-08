<template>
  <v-container fluid>
        <div class="ma-3" v-for="(i, key) in item">
          
            <v-card  >
              <v-container>
                <v-flex xs12>
                  <v-card-media
                    :src="i.imgSrc"
                    height="100px"
                  ></v-card-media>
                </v-flex>
                <v-flex xs12>
                    <div class="headline">{{key}}</div>
                    <br>
                     <v-expansion-panel popout>
                        <v-expansion-panel-content>
                          <div slot="header">Description</div>
                          <v-card-text class="grey lighten-3">
                            {{ i.description }}
                          </v-card-text>
                        </v-expansion-panel-content>
                     </v-expansion-panel>
                  
                </v-flex>
                <v-flex xs12>
                  <br>
                    <p><strong>Price:</strong> {{ i.price }}</p>
                    <p><strong>Quantity:</strong> {{ i.quantity}}</p>
                    <p><strong>subTotal:</strong> {{subTotal(i.quantity, i.price)}}</p>
                 </v-flex>
              </v-container>
            </v-card>
        </div>
  </v-container>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    subTotal(quantity, price){
      return quantity * price
    }
  }
}
</script>

<style >
</style>
