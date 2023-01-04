<template>
<Header />
<h1 class="text-center">Hantera kategorier</h1>
<!--Button to show add-item form if clicked - it is set to false onload -->
<div class="text-center">
<button class="btn btn-secondary" v-on:click="toggleButton()" ref="changeButtonName" >Lägg till ny kategori</button></div>
<div v-show="showAddCategories">
<!--When ate category is added -> get categories again -->
  <addCategory @categoryAdded="getCategories()" />
  </div>
 <h2 class="text-center">Lista över Kategorier</h2>
<!-- component for categorylist with deletebutton -->
<CategoryList
   @deleteCategory="deleteCategory(category.id)"
    v-for="category in AllCategoryArray"
    :category="category"
    :key="category.id"
  />

</template>


<script>
import addCategory from "../components/addCategory.vue";
import CategoryList from "../components/CategoryList.vue";
import Header from "../components/Header.vue"; 
export default {
  data() {
    return {
      categoryName: "",
      categoryDescription: "",
     errormsg: "",
      sucessmsg: "",
      AllCategoryArray: [],
      showAddCategories: false
    };
  },

  components: {
    CategoryList,
    addCategory,
    Header
  },
  methods: {
    toggleButton(){
  //toggle the form
  this.showAddCategories= !this.showAddCategories;
  //changes the name of the button with ref
  this.$refs.changeButtonName.innerText = this.showAddCategories?'Stäng formuläret':'Lägg till ny kategori';
},

  async getCategories() {
 let token = localStorage.getItem("token");

//fetch all categories
      const respCat = await fetch("http://127.0.0.1:8000/api/categories/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await respCat.json();
      this.AllCategoryArray = data;
    ;

  },    //delete item with id och DELETE call to api
    async deleteCategory(id) {
       if(confirm("Vill du radera varan?")) {
       let token = localStorage.getItem("token");
      console.log(id);
      const resp = await fetch("http://127.0.0.1:8000/api/categories/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      //alert user that category deleted
      alert("Kategori raderad")
      this.getCategories();
       }
    },



  },
  mounted() {
    this.getCategories();
  }
};
</script>
<style scoped>
h1,h2 {
  margin: 2%;
}

</style>