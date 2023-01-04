<template>
  <div class="container-sm">
    <!--Form for  -->
    <form @submit.prevent="addItem()">
      <div class="form-group">
        <fieldset>
          <legend>Lägg till produkt:</legend>

          <label for="itemName" class="form-label">Namn: </label>
          <input v-model="itemName" type="text" class="form-control" />

          <br />

          <label for="itemDescription" class="form-label">Beskrivning: </label>
          <input v-model="itemDescription" type="text" class="form-control" />

          <br />

          <label for="itemPrice" class="form-label">Pris </label>
          <input v-model="itemPrice" type="text" class="form-control" />

          <br />
          <label for="itemCount" class="form-label">Antal i lager </label>
          <input v-model="itemCount" type="text" class="form-control" />
          <br />
          <div>Kategori: {{ categoryId }}</div>
          <!--Loop for the categories from api -->
          <select v-model="categoryId">
            <option
              v-for="category in AllCategoryArray"
              :value="category.id"
              :key="category.id"
            >
              {{ category.categoryName }}
            </option>
          </select>
          <br />
          <p>{{ errormsg }}</p>
          <p>{{ sucessmsg }}</p>
          <br />
          <input type="submit" value="Lägg till" class="btn btn-primary" />
        </fieldset>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      itemCount: "",
      categoryId: "",

      errormsg: "",
      sucessmsg: "",
      AllCategoryArray: [],
    };
  },
  //declare the emits
  emits: ["itemAdded"],
  methods: {
    //get the categories on load
    async getCategories() {
      let token = localStorage.getItem("token");

      //fetch
      const respCat = await fetch("http://127.0.0.1:8000/api/categories", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await respCat.json();
      //store categories in array
      this.AllCategoryArray = data;
    },
//add an item
    async addItem() {
      let token = localStorage.getItem("token");
      //check inputs
      if (
        this.itemName &&
        this.itemDescription &&
        this.itemPrice &&
        this.itemCount != ""
      ) {
        //save inputs in a varible
        let itemBody = {
          itemName: this.itemName,
          itemDescription: this.itemDescription,
          itemPrice: this.itemPrice,
          itemCount: this.itemCount,
          categoryId: this.categoryId,
        };
        const resp = await fetch("http://127.0.0.1:8000/api/items", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(itemBody),
        });
        const data = await resp.json();
        this.itemName = "";
        this.itemDescription = "";
        this.itemPrice = "";
        this.itemCount = "";
        this.categoryId = "";
        //emit to parent component
        this.$emit("itemAdded");
        this.sucessmsg = "Vara tillagd";
        alert("Vara tillagd!");
        this.errormsg = "";
      } else {
        this.errormsg = "Alla fält måste fyllas i";
      }
    },
  },
  mounted() {
    this.getCategories();
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
