<template>
    <div id="login">
        <b-form @submit.prevent="login">
            <b-col>
                <b-row align-h="center">
                    <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                </b-row>
                <b-row class="mx-0 pb-4 mb-2 mt-2">
                    <span style="font-size:20px; font-weight:300;">
                        Entrar em Notícia para Todos
                    </span>
                </b-row>
                <b-row class="mx-0">
                    <b-form-group label="E-mail" label-for="inputEmail" label-align="start">
                        <b-form-input
                        id="inputEmail"
                        name="inputEmail"
                        type="email"
                        placeholder="Digite aqui seu e-mail"
                        v-model="email"
                        :state="isValidEmail(email)"
                        :disabled="loading"
                        required
                        >
                        </b-form-input>
                    </b-form-group>
                </b-row>
                <b-row class="mx-0">
                    <b-form-group label="Senha" label-for="inputPassword" label-align="start">
                        <b-input-group>
                            <b-form-input
                            id="inputPassword"
                            name="inputPassword"
                            :type="visibility ? 'text' : 'password'"
                            placeholder="Digite aqui sua senha"
                            v-model="password"
                            :state="isValidPassword(password)"
                            :disabled="loading"
                            required
                            >
                            </b-form-input>
                            <b-input-group-append>
                                <b-button @click="visibility = !visibility" variant="outline-secondary" class="eye-button">
                                    <b-icon :icon="visibility ? 'eye' : 'eye-slash'"></b-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-row>
                <b-row align-h="start" class="mx-3 mb-3">
                    <b-col class="p-0 mr-4 d-flex justify-content-start" style="max-width:fit-content;">
                        <b-checkbox style="max-width:fit-content;">Lembrar de mim</b-checkbox>
                    </b-col>
                    <b-col class="p-0 ml-4 d-flex justify-content-end" style="max-width:fit-content;">
                        <b-row class="mx-0" align-h="end">
                            <span class="pr-2" style="max-width:fit-content">Não possui conta?</span>
                            <b-link to="/cadastro" style="max-width:fit-content; padding-right:0px; padding-left:0px;">
                                Cadastre-se
                            </b-link>
                        </b-row>
                    </b-col>
                </b-row>
                <!-- <b-row class="mx-0 my-4" align-h="between">
                    <span style="max-width:fit-content">Não possui conta?</span>
                    <b-link to="/cadastro" style="max-width:fit-content">
                        Cadastre-se
                    </b-link>
                </b-row> -->
                <b-row class="mx-3 pt-4">
                    <b-button type="submit" variant="success" style="border-radius:8px; padding:10px 0px;" :disabled="loading">
                        <span v-if="loading"><b-spinner small></b-spinner></span>
                        <span v-else>Entrar</span>
                    </b-button>
                </b-row>
            </b-col>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data(){
        return {
            loading: false,
            email: '',
            password: '',
            visibility: false,
        }
    },
    methods:{
        isValidEmail(value){
            if(!value) return null;
            const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
            return regex.test(value);
        },
        isValidPassword(value){
            if(!value) return null;
            return value.length >= 6;
        },
        async login(){
            try{
                this.loading = true;
            }
            catch(error){
                console.log(error);
            }
            finally { this.loading = false; }
        },
    },
}
</script>

<style scoped>
#login{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    width:100%;
    background-color: #F1FFFA;
}
.eye-button{
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-color: #E1E1E3;
    background-color: white;
}
.eye-button:hover{
    color:black;
}
.eye-button:active{
    background-color: #F1F1F3 !important;
    color:black !important;
}
</style>