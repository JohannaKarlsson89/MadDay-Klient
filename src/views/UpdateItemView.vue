<template>
  <Header />
  <h2 class="text-center">Uppdatera produkt</h2>
  <div class="container-sm">
    <!-- Form to update item -->
    <form @submit.prevent="updateItem(id)">
      <div class="form-group">
        <fieldset>
          <legend>
            Uppdatera <b>{{ OneItem.itemName }} </b> :
          </legend>
          <label for="itemName" class="form-label">Namn: </label>
          <input v-model="OneItem.itemName" type="text" class="form-control" />
          <br />
          <label for="itemDescription" class="form-label">Beskrivning: </label>
          <input
            v-model="OneItem.itemDescription"
            type="text"
            class="form-control"
          />
          <br />
          <label for="itemPrice" class="form-label">Pris </label>
          <input v-model="OneItem.itemPrice" type="text" class="form-control" />
          <br />
          <label for="itemCount" class="form-label">Antal i lager </label>
          <input v-model="OneItem.itemCount" type="text" class="form-control" />
          <br />
          <br />
          <!-- selectbox for categories-->
          <select v-model="OneItem.categoryId">
            <option
              v-for="category in AllCategoryArray"
              :value="category.id"
              :key="category.id"
            >
              {{ category.categoryName }}
            </option>
          </select>
          <br />
          <br />
          <br />
          <p>
            {{ errormsg }}
          </p>
          <p>{{ sucessmsg }}</p>
          <br />
          <input type="submit" value="Uppdatera" class="btn btn-primary" />
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
      OneItem: [],
      AllCategoryArray: [],
      categoryArray: [],
      errormsg: "",
      sucessmsg: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    //GET the specific item
    async getOneItem(id) {
      let token = localStorage.getItem("token");
      const resp = await fetch("http://127.0.0.1:8000/api/items/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      this.OneItem = data;
    },
    //get categories
    async getCategories() {
      let token = localStorage.getItem("token");
      const respCat = await fetch("http://127.0.0.1:8000/api/categories", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await respCat.json();
      //save categories in the array
      this.AllCategoryArray = data;
    },
//update item
    async updateItem(id) {
      let token = localStorage.getItem("token");
      //check input
      if (
        this.OneItem.itemName &&
        this.OneItem.itemDescription &&
        this.OneItem.itemPrice &&
        this.OneItem.itemCount != ""
      ) {
        //Save the input from form in object
        let itemBody = {
          itemName: this.OneItem.itemName,
          itemDescription: this.OneItem.itemDescription,
          itemPrice: this.OneItem.itemPrice,
          itemCount: this.OneItem.itemCount,
          categoryId: this.OneItem.categoryId,
        };
        
        //PUT the itemBody into API
        const resp = await fetch("http://127.0.0.1:8000/api/items/" + id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          //convert itemBody to json and add to body
          body: JSON.stringify(itemBody),
        });
        const data = await resp.json();
        this.sucessmsg = "Produkt uppdaterad";
        this.errormsg = "";
        //alert to user that item is updated
        alert("Produkt uppdaterad");
        this.$router.push("/");
      } else {
        this.errormsg = "Alla fält måste fyllas i";
      }
    },
  },
  //when compontent is fully loaded then run the function to get item with specific id
  mounted() {
    this.getCategories();
    this.getOneItem(this.$route.params.id);
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 5%;
  padding: 5%;
  background-color: rgb(18, 19, 19);
}
.container-sm {
  max-width: 900px;
}
</style>