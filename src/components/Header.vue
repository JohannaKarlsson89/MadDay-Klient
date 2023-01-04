<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <div class="navbar-header">
          <!--logotype and link to startpage -->
          <div class="navbar-brand">
            <RouterLink to="/" class="nav-link"
              ><img src="../assets/logotype.png"
            /></RouterLink>
          </div>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/"> Hantera Lager </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/category"
                >Hantera kategorier
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/register"
                >Ny användare
              </RouterLink>
            </li>
            <!-- Log out button -->
            <li class="nav-item">
              <RouterLink class="nav-link" to="#" @click="logOut"
                >Logga ut
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  components: {
    RouterLink,
  },
  name: "Header",
  methods: {
    //log out function
    async logOut() {
      let token = localStorage.getItem("token");

      const resp = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Remove token från localstorage
          localStorage.removeItem("token");
        })

        .catch((err) => (this.errmsg = err));

      //redirect to startpage
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
ul {
  margin: 5%;
}
</style>