<template>
  <div id="app">
    <v-row
            align="center"
            justify="center"
    >
      <v-col cols="8">
        <div style="text-align: right">CA - HT : {{ht}} €</div>
        <div style="text-align: right">CA - TTC : {{ttc}} €</div>
        <div style="height: 40px">
          <v-btn small color="primary" style="float: right"><router-link to="/statistique" style="color: white;text-decoration: none">Statistiques</router-link></v-btn>
        </div>

        <v-row justify="center">
          <v-dialog v-model="dialog1" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <button v-on="on" style="outline-style: none;" id="plusUser"><img src="../assets/plus.png" height="40" width="40"/></button>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Ajout utilisateur</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field label="Prénom" id="firstname" v-model="firstname"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field label="Nom" id="lastname" v-model="lastname"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog1 = false">Annuler</v-btn>
                <v-btn color="blue darken-1" text @click="submitUser" id="addUser">Enregistrer</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-simple-table
                :fixed-header="fixedHeader"
        >
          <template v-slot:default>
            <thead>
            <tr>
              <th style="text-align: center;font-weight: bold;font-size: 24px">Prénom</th>
              <th style="text-align: center;font-weight: bold;font-size: 24px">Nom</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(client,i) in clients" :key="i" @click="modal(i)" class="test" style="cursor: pointer">
              <td style="text-align: center">{{ client.firstname }}</td>
              <td style="text-align: center">{{ client.lastname }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>


    <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            scrollable
            transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat="true">
          <v-btn @click="popup" style="background: none;border: none;box-shadow: none;" class="back">
            <img src="../assets/back.png" height="23" width="24"/>
          </v-btn>
          <v-toolbar-title style="margin: 0 auto;font-size: 24px;font-weight: bold;padding-right: 24px;">{{customer}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>


          <v-row justify="center">
            <v-dialog v-model="dialog2" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <button v-on="on" style="outline-style: none;"><img src="../assets/plus.png" height="40" width="40" id="plus"/></button>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Ajout produit</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field label="Produit" v-model="product" id="product"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field label="Quantité" v-model="quantity" id="quantity"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field label="Prix unitaire" v-model="unitPrice" id="unitPrice"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog2 = false">Annuler</v-btn>
                  <v-btn color="blue darken-1" text @click="submitProduct" id="addProduct">Enregistrer</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>


          <v-row align="center" justify="center">
            <v-col cols="8">

                  <v-simple-table
                          :fixed-header="fixedHeader"
                  >
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th style="text-align: center;font-weight: bold;font-size: 24px">Produit</th>
                        <th style="text-align: center;font-weight: bold;font-size: 24px">Quantité</th>
                        <th style="text-align: center;font-weight: bold;font-size: 24px">Prix à l'unité</th>
                      </tr>
                      </thead>
                      <tbody v-for="purchase in purchases" :key="purchase">
                        <tr v-for="pur in purchase" :key="pur">
                          <td style="text-align: center">{{ pur.product }}</td>
                          <td style="text-align: center">{{ pur.quantity }}</td>
                          <td style="text-align: center">{{ pur.unitPrice }} €</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>

            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'client',

  data(){
    return{
      dialog: false,
      dialog1: false,
      dialog2: false,
      index: 0,
      fixedHeader: true,
      clients: [],
      customer:'',
      ht:0,
      ttc:0,
      purchases: [],
      firstname:'',
      lastname:'',
      customer_id:'',
      product:'',
      quantity:0,
      unitPrice:0,
      current:{

      },
    }
  },
  mounted(){
    axios.get('http://mspr.califourchon.wtf/mspr-ci/customers')
            .then(responses => {
              // JSON responses are automatically parsed.
              for (var i=0; i<responses.data.length;i++) {
                this.clients.push(responses.data[i])
              }
            })
            .catch(e => {
              this.errors.push(e)
            });
    axios.get('http://mspr.califourchon.wtf/mspr-ci/turnovers')
            .then(responses => {
              // JSON responses are automatically parsed.
                this.ht = responses.data.turnoverht
                this.ttc = responses.data.turnoverttc
            })
            .catch(e => {
              this.errors.push(e)
            });
  },
  methods:{
    modal(i){
      this.dialog = true,
      this.index = i,
      this.current = this.clients[i]
      this.purchases = []
      axios.get('http://mspr.califourchon.wtf/mspr-ci/purchases/'+this.clients[i].customer_id)
              .then(responses => {
                // JSON responses are automatically parsed.
                for (var i=0; i<responses.data.length;i++) {
                  this.purchases.push(responses.data[i].purchases)
                }
              })
              .catch(e => {
                this.errors.push(e)
              });
      axios.get('http://mspr.califourchon.wtf/mspr-ci/customers/'+this.clients[i].customer_id)
              .then(responses => {
                // JSON responses are automatically parsed.
                for (var i=0; i<responses.data.length;i++) {
                  this.customer = responses.data[i].firstname+' '+responses.data[i].lastname
                  this.customer_id = responses.data[i].customer_id
                }
              })
              .catch(e => {
                this.errors.push(e)
              });
    },
    popup(){
      this.dialog = false
    },
    submitUser() {
      axios.post('http://mspr.califourchon.wtf/mspr-ci/customers', {
        firstname: this.firstname,
        lastname: this.lastname
      })
              .then(function (response) {
                window.console.log(response);
              })
              .catch(function (error) {
                window.console.log(error);
              });
      this.dialog1 = false;
      location.reload();
    },
    submitProduct() {
      axios.post('http://mspr.califourchon.wtf/mspr-ci/purchases', {
        customer_id: this.customer_id,
        product: this.product,
        quantity: parseFloat(this.quantity),
        unitPrice: parseFloat(this.unitPrice)
      })
              .then(function (response) {
                window.console.log(response);
              })
              .catch(function (error) {
                window.console.log(error);
              });
      this.dialog2 = false;
      location.reload();
    }
  }
}
</script>
