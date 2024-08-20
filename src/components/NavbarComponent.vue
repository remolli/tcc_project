<template>
    <div class="navbar-parent">
        <b-row class="m-0 w-100" align-h="between" align-v="center">
            <b-button variant="link" style="width:max-content; height:max-content;"
            @click="$router.push({name: 'home'})">
                <img src="@/assets/logo.svg" alt="Logo Notícias para Todos" 
                style="width:50px;height:50px; object-fit:contain !important; padding:0px;">
            </b-button>

            <b-button v-if="isMobile" v-b-toggle.sidebar variant="light" class="py-1" style="font-size:20px; padding:4px 10px; max-width:max-content; max-height:45px;">
                <b-icon icon="list"></b-icon>
            </b-button>
            <b-sidebar id="sidebar" title="Notícia para todos" shadow backdrop right>
                <div class="d-flex flex-column align-items-start p-3 px-4">
                    <b-button @click="$router.push({name: 'home'})" variant="link" class="nav-mobile-link w-100 py-2"
                    > Home </b-button>
                    <b-button @click="$router.push({name: 'about'})" variant="link" class="nav-mobile-link w-100 py-2"
                    > Sobre </b-button>
                    <b-button @click="$router.push({name: 'feedback'})" variant="link" class="nav-mobile-link w-100 py-2"
                    > Feedback </b-button>
                    <b-button @click="$router.push({name: 'login'})" variant="link" class="nav-mobile-link w-100 py-2"
                    > Login </b-button>
                    <b-button @click="$router.push({name: 'register'})" variant="link" class="nav-mobile-link w-100 py-2"
                    > Registrar </b-button>
                </div>
            </b-sidebar>

            <div v-if="!isMobile" class="d-flex justify-content-between p-0" style="width:70%; max-width:500px;">
                <b-button @click="$router.push({name: 'home'})" variant="link" class="nav-desktop-link"
                > Home </b-button>
                <b-button @click="$router.push({name: 'about'})" variant="link" class="nav-desktop-link"
                > Sobre </b-button>
                <b-button @click="$router.push({name: 'feedback'})" variant="link" class="nav-desktop-link"
                > Feedback </b-button>

                <b-button v-if="isLogged" class="py-1">
                    <b-icon icon="person"></b-icon>
                </b-button>
                
                <div class="d-flex p-0 align-items-center">
                    <b-button v-if="!isLogged" variant="light" class="py-2" @click="$router.push({name: 'login'})"
                    style="max-height:45px;">
                        Login
                    </b-button>
                    <div style="width:10px;"></div>
                    <b-button v-if="!isLogged" variant="light" class="py-2" @click="$router.push({name: 'register'})"
                    style="max-height:45px;">
                        Registrar
                    </b-button>
                </div>
            </div>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "NavbarComponent",
    data(){
        return {
            isLogged: false,
            isMobile: window.innerWidth < 720,
        }
    },
    created(){
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
}
</script>

<style scoped>
.navbar-parent{
    /* background-color: #3ead86; */
    /* background-color: #2c5a45; */
    background-color: #BAF1AB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:5px 20px;
    position: fixed;
    top:0px;
    width:100%;
    z-index: 10;
    box-shadow: 0px 10px 20px #15202530;
    border-bottom: 4px solid #a5d398;
}
.nav-desktop-link{
    color: #555;
    text-decoration: none;
}
.nav-mobile-link{
    color: #454545;
    text-decoration: none;
    background-color: #F1F1F3;
    border: 2px solid #A1A1A3 !important;
    margin-top: 10px;
}
.nav-mobile-link:hover, .nav-desktop-link:hover{ text-decoration: underline; }
.nav-mobile-link:hover{ color: black; background-color: #BAF1AB; }
.nav-desktop-link:hover{ color: black; }
</style>