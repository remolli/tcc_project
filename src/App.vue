<template>
  <div id="app" translate="no" style="max-width:100%;">
    
    <NavbarComponent/>
    <!-- <nav class="p-0" style="z-index:10; position:sticky; top:0px; width:100%; background:white; border-bottom:2px solid #e1e1e3; box-shadow: 0px 5px 20px #00000020">
      <b-row align-v="center" style="min-height:40px;">
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
    </nav> -->
    <router-view/>
    <div id="google_translate_element"></div>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
export default {
  components:{
    NavbarComponent,
  },
  mounted(){
    this.translateConfigs();
    setTimeout(()=>{
      this.googleTranslateElementInit();
      this.doTranslate();
    },1000);
    setTimeout(()=>{
        var isEmpty = document.getElementById('google_translate_element').innerHTML === "";
        if(isEmpty) this.$router.go();
    }, 1250)
  },
  methods:{
    googleTranslateElementInit() {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
      }, 'google_translate_element');
    },
    doTranslate(){
      var select = document.querySelector('select.goog-te-combo');
      if (select) {
        select.value = 'pt';
        select.id = 'google-translate-widget';
        select.dispatchEvent(new Event('change'));
      }
    },
    translateConfigs() {
      setInterval(()=>{
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
          if (element.classList.contains('article_content')) {
            element.setAttribute('translate', 'yes');
          }
        });
        const fonts = document.querySelectorAll('font');
        fonts.forEach(element => {
          element.removeAttribute('class');
        });
        const body = document.querySelectorAll('body');
          body.forEach(e => {
              e.style.top = '0px';
          });
        const el = document.querySelectorAll('*');
          el.forEach(e => {
              if(e.classList.contains('skiptranslate'))
               e.style.display = 'none';
          });
      }, 0)
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

#google_translate_element{
  /* position: absolute;
  top:5px;
  right:0px; */
  z-index: 2;
}
.goog-te-combo{
  padding:5px;
  border-radius:5px;
  border-color: #ccc;
}
/* .goog-te-combo option:not([value='en']):not([value='es']):not([value='pt']):not([value='ar']):not([value='fr']) { */
.goog-te-combo option:not([value='en']):not([value='pt']) {
  display: none;
}

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
  height: 70px;
  width: 70px;
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

.btn-light{
  border:2px solid #999 !important;
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
