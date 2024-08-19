<template>
    <div class="navbar-parent">
        <b-row class="m-0 w-100" align-h="between">
            <b-button v-if="isMobile" v-b-toggle.sidebar variant="light" class="py-1" style="font-size:20px; padding:4px 10px; max-width:max-content;">
                <b-icon icon="list"></b-icon>
            </b-button>
            <b-sidebar id="sidebar" title="Notícia para todos" shadow backdrop>
                <div class="d-flex flex-column align-items-start p-3 px-4">
                    <b-button @click="$router.push({name: 'home'})" variant="link" class="nav-mobile-link"
                    > Home </b-button>
                    <b-button @click="$router.push({name: 'about'})" variant="link" class="nav-mobile-link"
                    > Sobre </b-button>
                    <b-button @click="$router.push({name: 'feedback'})" variant="link" class="nav-mobile-link"
                    > Feedback </b-button>
                    <b-button @click="$router.push({name: 'login'})" variant="link" class="nav-mobile-link"
                    > Login </b-button>
                    <b-button @click="$router.push({name: 'register'})" variant="link" class="nav-mobile-link"
                    > Registrar </b-button>
                </div>
            </b-sidebar>

            <div v-if="!isMobile" class="d-flex justify-content-between p-0" style="width:50%; max-width:300px;">
                <b-button @click="$router.push({name: 'home'})" variant="link" class="nav-desktop-link"
                > Home </b-button>
                <b-button @click="$router.push({name: 'about'})" variant="link" class="nav-desktop-link"
                > Sobre </b-button>
                <b-button @click="$router.push({name: 'feedback'})" variant="link" class="nav-desktop-link"
                > Feedback </b-button>
            </div>

            <div class="d-flex justify-content-end p-0" style="max-width:50%;">
                <b-button v-if="isLogged" class="py-1">
                    <b-icon icon="person"></b-icon>
                </b-button>
                <b-button v-if="!isLogged" variant="light" class="py-2" @click="$router.push({name: 'login'})">
                    Login
                </b-button>
                <div style="width:10px;"></div>
                <b-button v-if="!isLogged" variant="light" class="py-2" @click="$router.push({name: 'register'})">
                    Registrar
                </b-button>
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
    background-color: #2c5a45;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:10px 20px;
}
.nav-desktop-link{
    color: #D7D7D9;
    text-decoration: none;
}
.nav-mobile-link{
    color: #656565;
    text-decoration: none;
}
.nav-mobile-link:hover, .nav-desktop-link:hover{ text-decoration: underline; }
.nav-mobile-link:hover{ color: black; }
.nav-desktop-link:hover{ color: white; }
</style>