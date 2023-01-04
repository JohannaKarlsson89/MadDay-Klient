<template>
<div class="logo-background">
<img class="rounded mx-auto d-block" src="../assets/logotype.png" >
</div>
<h1 class="text-center">Logga in för tillgång till intranätet</h1>
  <div class="container-sm">
    <!--Form to login -->
    <form class="form-group" @submit.prevent="logIn()">
      <fieldset>
        <legend>Logga in:</legend>
        <label for="userEmail" class="form-label">Epost: </label>
        <input v-model="userEmail" type="text" class="form-control" />

        <br />
        <label for="userPassword" class="form-label">Lösenord: </label>
        <input v-model="userPassword" type="password" class="form-control" />
        <br />
        <p>
          {{ errormsg }}
        </p>
        <p>{{ sucessmsg }}</p>
        <br />
        <input type="submit" value="Logga in" class="btn btn-primary" />
      </fieldset>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
      errormsg: "",
      sucessmsg: "",
    };
  },
  methods: {
    async logIn() {
      //check input
      if (this.userEmail && this.userPassword != "") {
        //create body
        let userBody = {
          email: this.userEmail,
          password: this.userPassword,
        };

        const resp = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userBody),
        })
          .then((res) => res.json())
          .then((data) => {
            //check if token is empty
            if (data.token == null) {
              //add message from api to errormsg
              this.errormsg = data.message;
              console.log(data.message);
            } else {
              //saves token i varible
              console.log(data);
              let token = data.token;
              //save token i localstorage under name token
              localStorage.setItem("token", token);
            }
          })
          .catch((err) => (this.errmsg = err));

        //empty inputfields
        this.userEmail = "";
        this.userPassword = "";

        //redirect to startpage
        this.$router.push("/");
      } else {
        console.log("inte inloggad");
        this.errormsg = "Fyll i epost och lösenord ";
      }
    },
  },
};
</script>


<style  scoped>
.form-group {
  margin-top: 5%;
  padding:5%;
  background-color: rgb(18, 19, 19);
}
.container-sm{
  max-width: 900px;
  margin-bottom: 2%;
}
.logo-background {
  padding: 1%;
  background-color:whitesmoke;
}
h1 {
  margin: 2%;
}
</style>