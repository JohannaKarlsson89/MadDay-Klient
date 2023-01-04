<template>


<div class="container-sm">
  <article>
     <ul class="list-group">
 <li class="list-group-item">Namn: {{category.categoryName}}</li>
 <li class="list-group-item">Beskrivning: {{category.categoryDescription}}</li>
 <li class="list-group-item">id:{{ category.id }} </li>
     </ul>
     <!-- delete button with emit to parent -->
      <button class="btn btn-danger" @click="$emit('deleteCategory')">Radera</button>
    <br />
  <!--   Send the id of the item with the link so that I can use the id to fetch a specific item -->
    <router-link :to="{ name: 'UpdateCategory', params: { id: category.id }}">
      <p class="btn btn-info">Uppdatera</p>
    </router-link>
  </article>
</div> 

  </template>

<script>
export default {
  data() {

  
  return {

 } },
   props: {
        //Object of every item in array
    category: Object,
    
  },

    
 
};
</script>

<style scoped>
.container-sm {
  background-color: rgb(66, 83, 83);
  color: black;
  padding: 3%;
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