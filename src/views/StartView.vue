<template>
<Header />
<h1 class="text-center">Hantera lager</h1>

<!--Button to show add-item form if clicked - it is set to false onload -->
<div class="text-center">
<button class="btn btn-secondary" v-on:click="toggleButton()" ref="changeButtonName" >Lägg till ny produkt</button></div>
<div v-show="showAddItem">

  <!--Component for form when new item is added the list of products is reloaded -->
 <AddItem @itemAdded="getItems()" />
</div>
  <h2 class="text-center">Lista över produkter</h2>
  <StockList
    @deleteItem="deleteItem(item.id)"
    v-for="item in items"
    :item="item"
    :key="item.id"
  />
 
</template>


<script>
//import the component stocklist an addItem
import StockList from "../components/StockList.vue";
import AddItem from "../components/addItem.vue";
import Header from "../components/Header.vue"; 
export default {
  data() {
    return {
      //data array of items
      items: [],
      categoryArray: [],
      showAddItem: false
    };
  },
  components: {
    StockList,
    AddItem,
    Header
  },
  
  methods: {
//check if user is logged in by checking if token is empty 
    checkUser() {
           let token = localStorage.getItem("token");
      if (token == null) {
       
        this.$router.push("/login");
      } else {
        this.getItems();
      }
    },
toggleButton(){
  //toggle the form
  this.showAddItem= !this.showAddItem;
  //changes the name of the button with ref
  this.$refs.changeButtonName.innerText = this.showAddItem?'Stäng formuläret':'Lägg till ny produkt';
},
    //async function that use ajax to fetch items
    async getItems() {
 
     let token = localStorage.getItem("token");

      //fetch
      const resp = await fetch("http://127.0.0.1:8000/api/items/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      this.items = data;



    },

   
    async deleteItem(id) {
      //user has to confirm delete
      if(confirm("Vill du radera produkten?")) {
      
      let token = localStorage.getItem("token");
 //delete item with id och DELETE call to api
      const resp = await fetch("http://127.0.0.1:8000/api/items/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
    
      this.getItems();
    }else {
      console.log("inte raderad");
    }
    },
  },
  mounted() {
    this.checkUser();
  },
};
</script>

<style scoped>
h1,h2 {
  margin: 2%;
}
</style>
