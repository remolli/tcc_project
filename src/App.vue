<template>
  <div id="app">
    <nav class="p-0" style="z-index:10; position:fixed; width:100%; background:white; border-bottom:2px solid #e1e1e3; box-shadow: 0px 5px 20px #00000020">
      <b-row align-v="center" style="height:40px;">
        <b-col>
          <router-link to="/">Home</router-link>
        </b-col>
        <b-col>
          <router-link to="/sobre">Sobre</router-link>  
        </b-col>
        <b-col>
          <router-link to="/login">Login</router-link>
        </b-col>
        <b-col>
          <router-link to="/cadastro">Cadastro</router-link>
        </b-col>
        <b-col>
          <router-link to="/recuperar">Recuperar senha</router-link>
        </b-col>
        <b-col>
          <router-link to="/feedback">Feedback</router-link>
        </b-col>
      </b-row>
    </nav>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

* {
  font-family: "Inter", sans-serif !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0px 20px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.logo-large{
  height: 90px;
  width: 90px;
  object-fit: contain;
}

label {
  margin-bottom: 0px;
}
.form-group {
  margin-bottom: 10px;
}
.form-control {
  padding: 20px 10px !important;
}

.eye-button{
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-color: #E1E1E3;
    background-color: white !important;
}
.eye-button:hover{
    background-color: #F1F1F3 !important;
    color:black !important;
}
.eye-button:active{
    background-color: #E1E1E3 !important;
    color:black !important;
}

::placeholder {
  color: black !important;
  opacity: .5 !important;
  font-size: 14px;
}
::-ms-input-placeholder {
  color: black !important;
  opacity: .5 !important;
  font-size: 14px;
}

/* .fill-success-button{
  
} */
/* .outline-success-button */

</style>
