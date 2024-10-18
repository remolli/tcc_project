<template>
    <nav class="navbar-parent" role="navigation">
        <b-row class="m-0 w-100" align-h="between" align-v="center">
            <b-button role="link" variant="link" class="logo-button"
            title="Alternativa para página inicial"
            aria-label="Alternativa para página inicial"
            @click="$router.push({name: 'home'})">
                <img src="@/assets/logo.svg" alt="Logo Notícias para Todos"
                style="width:50px;height:50px; object-fit:contain !important; padding:0px;">
            </b-button>

            <b-button v-if="isMobile" v-b-toggle.sidebar variant="light" class="py-1" 
            aria-label="Lista navegação"
            style="font-size:20px; padding:4px 10px; max-width:max-content; max-height:45px;">
                <b-icon icon="list"></b-icon>
            </b-button>
            <b-sidebar id="sidebar" title="Notícia para todos" shadow backdrop right>
                <div class="d-flex flex-column align-items-start p-3 px-4">
                    <b-button role="link" @click="$router.push({name: 'home'})" variant="link" class="nav-mobile-link w-100 py-2"
                    :class="currentRoute=='home'? 'nav-desktop-button-active' :''"
                    > Home </b-button>
                    <b-button role="link" @click="$router.push({name: 'about'})" variant="link" class="nav-mobile-link w-100 py-2"
                    :class="currentRoute=='about'? 'nav-desktop-button-active' :''"
                    > Sobre nós </b-button>
                    <b-button role="link" @click="$router.push({name: 'feedback'})" variant="link" class="nav-mobile-link w-100 py-2"
                    :class="currentRoute=='feedback'? 'nav-desktop-button-active' :''"
                    > Feedback </b-button>
                    
                    <b-button v-if="isLogged" role="link" @click="logout" variant="link" class="nav-mobile-link w-100 py-2"
                    > Logout </b-button>

                    <b-button v-if="!isLogged" role="link" @click="$router.push({name: 'login'})" variant="link" class="nav-mobile-link w-100 py-2"
                    :class="currentRoute=='login'? 'nav-desktop-button-active' : ''"
                    > Login </b-button>
                    <b-button v-if="!isLogged" role="link" @click="$router.push({name: 'register'})" variant="link" class="nav-mobile-link w-100 py-2"
                    :class="currentRoute=='register'? 'nav-desktop-button-active' : ''"
                    > Cadastre-se </b-button>
                </div>
            </b-sidebar>

            <div v-if="!isMobile" class="d-flex justify-content-between p-0" style="width:80%; max-width:550px;">
                <b-button role="link" @click="$router.push({name: 'home'})" variant="link" class="nav-desktop-link"
                :class="currentRoute=='home'? 'nav-desktop-link-active' :''"
                > Home </b-button>
                <b-button role="link" @click="$router.push({name: 'about'})" variant="link" class="nav-desktop-link"
                :class="currentRoute=='about'? 'nav-desktop-link-active' :''"
                > Sobre nós </b-button>
                <b-button role="link" @click="$router.push({name: 'feedback'})" variant="link" class="nav-desktop-link"
                :class="currentRoute=='feedback'? 'nav-desktop-link-active' :''"
                > Feedback </b-button>

                <b-button v-if="isLogged" variant="light" class="py-2 d-flex align-items-center" @click="logout"
                style="max-height:45px;">
                    Logout
                </b-button>
                <div v-else class="d-flex p-0 align-items-center">
                    <b-button role="link" variant="light" class="py-2" @click="$router.push({name: 'login'})"
                    :class="currentRoute=='login'? 'nav-desktop-button-active' : ''" style="max-height:45px;">
                        Login
                    </b-button>
                    <div style="width:10px;"></div>
                    <b-button role="link" variant="light" class="py-2" @click="$router.push({name: 'register'})"
                    :class="currentRoute=='register'? 'nav-desktop-button-active' : ''" style="max-height:45px;">
                        Cadastre-se
                    </b-button>
                </div>
            </div>
        </b-row>
    </nav>
</template>

<script>
import Utility from '@/utils/Utility';
import cookies from '@/plugins/cookies';
export default {
    name: "NavbarComponent",
    data(){
        return {
            isLogged: false,
            isMobile: window.innerWidth < 720,
            currentRoute: null,
        }
    },
    created(){
        setInterval(()=>{
            if(this.currentRoute != this.$route.name) this.currentRoute = this.$route.name;
            this.isLogged = !!cookies.getToken();
        }, 250)
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
    methods: {
        logout(){
            Utility.questionSnackBar("Deseja realmente sair?", ()=>{
                cookies.deleteToken();
                Utility.successSnackBar("Logout realizado com sucesso!", null, ()=>{ 
                    this.$router.go();
                })
            })
        },
    }
}
</script>

<style scoped>
.navbar-parent{
    background-color: #BAF1AB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:5px 20px;
    position: fixed;
    top:0px;
    right:0px;
    left:0px;
    width:100%;
    z-index: 10;
    box-shadow: 0px 10px 20px #15202530;
    border-bottom: 4px solid #a5d398;
}
.logo-button{
    width:max-content;
    height:max-content;
}
.logo-button:hover{ background-color: #F1F1F3; }
.nav-desktop-link{
    color: #555;
    text-decoration: none;
    border-radius: 6px;
}
.nav-mobile-link{
    color: #454545;
    text-decoration: none;
    background-color: #F1F1F3;
    border: 2px solid #A1A1A3 !important;
    margin-top: 10px;
    border-radius: 6px;
}
.nav-mobile-link:hover, .nav-desktop-link:hover{ text-decoration: underline; }
.nav-mobile-link:hover{ color: black; background-color: #BAF1AB; }
.nav-desktop-link:hover{ color: black; }
.nav-mobile-link-active{
    color: black !important;
    background-color: #D6FFE7 !important;
    border: 2px solid #2E9A40 !important;
}
.nav-desktop-link-active{
    color: black !important;
    font-weight:500 !important;
    border-bottom: 2px solid #2E9A40 !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
}
.nav-desktop-button-active{
    color: black !important;
    font-weight:500 !important;
    border: 2px solid #2E9A40 !important;
    background-color: #D6FFE7 !important;
}
</style>