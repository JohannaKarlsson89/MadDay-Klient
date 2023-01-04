<template>
<Header />
<h1 class="text-center">Registrera ny användare här</h1>
  <div class="container-sm">
    <!-- Form for register new user -->
    <form class="form-group" @submit.prevent="register()">
      <fieldset>
        <legend>Registrera användare:</legend>
        <label for="userName" class="form-label">Namn: </label>
        <input v-model="userName" type="text" class="form-control" />

        <br />

        <label for="userEmail" class="form-label">Epost: </label>
        <input v-model="userEmail" type="text" class="form-control" />

        <br />
        <label for="userPassword" class="form-label">Lösenord: </label>
        <input v-model="userPassword"  type="password" class="form-control" />
        <br />
        <br />
        <p>
          {{ errormsg }}
        </p>
        <p>{{ sucessmsg }}</p>
        <br />

        <input type="submit" value="Registrera" class="btn btn-primary" />
      </fieldset>
    </form>
  </div>
</template>

<script>
import Header from "../components/Header.vue"; 
export default {
  data() {
    return {
      userName: "",
      userEmail: "",
      userPassword: "",
      errormsg: "",
      sucessmsg: "",
    };
  },
  components: {
    Header
  },
  methods: {
    async register() {
      if (this.userEmail &&  this.userName != "") {
        //password needs to be more than 6 letters long
        if (this.userPassword.length > 6) {  
        //create variable     
        let userBody = {
          name: this.userName,
          email: this.userEmail,
          password: this.userPassword,
        };
//post the new user to api
const resp = await fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(userBody)
        })
        .then(res => res.json())
        .then(userBody => console.log(userBody))
        .catch(err => console.log(err));
 this.sucessmsg = "användare skapad";
 this.errormsg = "";
        
//empty input fields
this.userName ="";
this.userEmail = "";
this.userPassword ="";
//redirect to login page
alert("Användare skapad");
this.$router.push('/login');
              
        }else{
           this.errormsg = "Lösenord måste vara minst 6 tecken";
        }
      } else {
        console.log("inte inloggad");
        this.errormsg = "Fyll i alla fält";
      }
    },
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