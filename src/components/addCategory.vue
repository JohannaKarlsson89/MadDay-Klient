<template>
  <div class="container-sm">
    <!-- Form for adding category -->
    <form @submit.prevent="addCategory()">
      <div class="form-group">
        <fieldset>
          <legend>Lägg till kategori:</legend>
          <label for="categoryName" class="form-label">
            Kategorins namn:
          </label>
          <input v-model="categoryName" type="text" class="form-control" />
          <br />
          <label for="categoryDescription" class="form-label"
            >Beskrivning av kategori:
          </label>
          <input
            v-model="categoryDescription"
            type="text"
            class="form-control"
          />
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
export default {
  data() {
    return {
      categoryName: "",
      categoryDescription: "",
      errormsg: "",
      sucessmsg: "",
      AllCategoryArray: [],
    };
  },
  //declare the emits
  emits: ["categoryAdded"],
  methods: {
    async getCategories() {
      //get token
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
      this.AllCategoryArray = data;
    },

    async addCategory() {
      let token = localStorage.getItem("token");
      if (this.categoryName && this.categoryDescription != "") {
      //create body with the users input
      let categoryBody = {
          categoryName: this.categoryName,
          categoryDescription: this.categoryDescription,
        };
        const resp = await fetch("http://127.0.0.1:8000/api/categories", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(categoryBody),
        });
        const data = await resp.json();
        //clear inputs
        this.categoryName = "";
        this.categoryDescription = "";
        this.errormsg = "";
        this.sucessmsg = "Kategori tillagd";
        //emit to parent component
        this.$emit("categoryAdded");
      } else {
        this.errormsg = "Alla fält måste fyllas i";
        this.sucessmsg = "";
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
