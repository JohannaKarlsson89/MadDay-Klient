<template>
<Header />
<h1 class="text-center">Uppdatera kategori</h1>
    <div class="container-sm">
      <!--Form to update category -->
  <form @submit.prevent="updateCategory(id)">
    <div class="form-group">
      <fieldset>
        <legend>Uppdatera kategori:</legend>
        <label for="categoryName" class="form-label"> Kategorins namn: </label>
        <input v-model="OneCategory.categoryName" type="text" class="form-control" />
        <br />
      <label for="categoryDescription" class="form-label">Beskrivning av kategori: </label>
        <input v-model="OneCategory.categoryDescription" type="text" class="form-control" />
       <br />
        <p>
          {{ errormsg }}
        </p>
        <p>{{ sucessmsg }}</p>
        <br />

        <input type="submit" value="Lägg till" class="btn btn-primary" />
      </fieldset>
    </div>
  </form>
    </div>
</template>

<script>
import Header from "../components/Header.vue"; 
export default {
  data() {
    return {
      //Save the id from the url
      id: this.$route.params.id,
      OneCategory: [],
      errormsg: "",
      sucessmsg: "",
    };
  },
  components: {
    Header
  },
  methods: {
    //GET the specific item
    async getOneCategory(id) {
       
      const resp = await fetch(
     "http://127.0.0.1:8000/api/categories/" +id,
      );
           const data = await resp.json();
           //save the data in a varible
      this.OneCategory= data;
    },
    async updateCategory(id) {
        let token = localStorage.getItem("token");
//check input
      if (
        this.OneCategory.categoryName &&
        this.OneCategory.categoryDescription != ""
      ) {
      //Save the input from form in object
      let CategoryBody = {
          categoryName: this.OneCategory.categoryName,
          categoryDescription: this.OneCategory.categoryDescription
        };
    
      //PUT the itemBody into API
      const resp = await fetch(
      
       "http://127.0.0.1:8000/api/categories/" +id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
              Authorization: "Bearer " + token,
          },
          //convert itemBody to json and add to body
          body: JSON.stringify(CategoryBody),
        }
      );
      const data = await resp.json();
      this.OneCategory.categoryName = "";
      this.OneCategory.categoryDescription = "";
       this.sucessmsg = "Kategori uppdaterad";
        this.errormsg = "";
        alert("Kategori uppdaterad");
         this.$router.push("/category");
      }else {
        this.errormsg = "Alla fält måste fyllas i";
      } 
    },
  },
  //when compontent is fully loaded then run the function to get item with specific id
  mounted() {
    this.getOneCategory(this.$route.params.id);
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 5%;
  padding:5%;
  background-color: rgb(18, 19, 19);
}
.container-sm{
  max-width: 900px;
}
h1,h2 {
  margin: 2%;
}

</style>