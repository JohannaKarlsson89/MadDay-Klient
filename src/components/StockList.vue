<template>
  <div class="container-sm">
    <article>
      <ul class="list-group">
        <li class="list-group-item">Namn: {{ item.itemName }}</li>
        <li class="list-group-item">Beskrivning: {{ item.itemDescription }}</li>
        <li class="list-group-item">Antal i lager: {{ item.itemCount }}</li>
        <li class="list-group-item">Pris: {{ item.itemPrice }}</li>
        <!-- loop for categories the categoryId from items corronsponds to id in categories -->
        <li
          class="list-group-item"
          v-for="category in categoryArray"
          :category="category"
          :key="category.categoryId"
        >
          Kategori: {{ category.categoryName }}
        </li>
      </ul>
      <!--Button for delete -->
      <button class="btn btn-danger" @click="$emit('deleteItem')">
        Radera
      </button>
      <br />
      <!--   Send the id of the item with the link so that I can use the id to fetch a specific item -->
      <router-link :to="{ name: 'UpdateItem', params: { id: item.id } }">
        <p class="btn btn-info">Uppdatera</p>
      </router-link>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryArray: [],
    };
  },
  props: {
    //Obeject of every item in array from
    item: Object,
  },
  methods: {
    async getCategories() {
      let token = localStorage.getItem("token");
      let id = this.item.categoryId;

      //fetch category with id
      const respCat = await fetch(
        "http://127.0.0.1:8000/api/getCategoryById/" + id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await respCat.json();
      this.categoryArray = data;
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style scoped>
.container-sm {
  background-color: rgb(66, 83, 83);
  color: black;
  padding: 2% 3%;
  margin-top: 1%;
}
.btn {
  margin: 2% 0 1% 0;
}

@media (min-width: 768px) {
  .container-sm {
    width: 40%;
  }
}
</style>