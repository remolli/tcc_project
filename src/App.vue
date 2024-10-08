<template>
  <div id="app" translate="no">
    <b-col class="p-0 d-flex align-items-center justify-content-center flex-column">
      
      <NavbarComponent style="width:100% !important;"/>

      <router-view/>

      <div id="google_translate_element"></div>
      
      <FooterComponent v-if="currentRoute=='home'"
      style="width:100vw !important;"
      :text="copyright"/>
    </b-col>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
export default {
  components:{
    NavbarComponent,
    FooterComponent,
  },
  data(){
    return {
      copyright: null,
      currentRoute: null,
    }
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
    }, 2250)
    setInterval(()=>{
        if(this.currentRoute != this.$route.name) this.currentRoute = this.$route.name; 
    }, 250)
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
        
        const body = document.body;
        body.style.top = '0px';

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
  font-display: swap;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
output:focus-visible,
a:focus-visible
{
  box-shadow: 0px 0px 0px 5px #4c82ff !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F1FFFA;
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
  padding: 0px !important;
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
.eye-button:focus-visible,
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  white-space: nowrap;
}
</style>
