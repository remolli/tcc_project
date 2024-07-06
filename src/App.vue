<template>
  <div id="app">
    <nav style="position:fixed; width:100%;">
      <b-row>
        <b-col>
          <router-link to="/">Home</router-link>
        </b-col>
        <b-col>
          <router-link to="/sobre">Sobre</router-link>
        </b-col>
        <b-col>
          <router-link to="/contato">Contato</router-link>
        </b-col>
        <b-col>
          <router-link to="/login">Login</router-link>
        </b-col>
        <b-col>
          <router-link to="/cadastro">Cadastro</router-link>
        </b-col>
      </b-row>
    </nav>
    <router-view/>
  </div>
</template>

<style>
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
</style>
