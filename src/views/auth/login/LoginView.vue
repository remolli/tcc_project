<template>
    <div id="login" style="padding-top: 50px;">
        <b-form @submit.prevent="login" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <header role="banner">
                        <b-row align-h="center">
                            <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                        </b-row>
                        <b-row class="mx-0 pb-4 mb-2 mt-2">
                            <h1 style="font-size:20px; font-weight:300;">
                                Entrar em Notícia para Todos
                            </h1>
                        </b-row>
                    </header>
                    <fieldset role="group">
                        <b-row class="mx-0">
                            <b-form-group label="E-mail" label-for="inputEmail" label-align="start">
                                <b-form-input
                                id="inputEmail"
                                name="inputEmail"
                                ref="inputEmail"
                                type="email"
                                placeholder="Digite aqui seu e-mail"
                                v-model="email"
                                :state="email ? isValidEmail : null"
                                :aria-invalid="email ? !isValidEmail : null"
                                aria-errormessage="errorEmail"
                                :disabled="loading"
                                required
                                >
                                </b-form-input>
                                <b-form-invalid-feedback id="errorEmail" :state="email ? isValidEmail : null" style="text-align:start;">
                                    Formato de e-mail inválido.
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-row>
                        <b-row class="mx-0">
                            <b-form-group label="Senha" label-for="inputPassword" label-align="start">
                                <b-input-group>
                                    <b-form-input
                                    id="inputPassword"
                                    name="inputPassword"
                                    ref="inputPassword"
                                    :type="visibility ? 'text' : 'password'"
                                    placeholder="Digite aqui sua senha"
                                    v-model="password"
                                    :disabled="loading"
                                    required
                                    >
                                    </b-form-input>
                                    <b-input-group-append>
                                        <b-button @click="visibility = !visibility" variant="outline-secondary" class="eye-button"
                                        :aria-label="visibility ? 'Esconder senha' : 'Visualizar senha'">
                                            <b-icon :icon="visibility ? 'eye' : 'eye-slash'"></b-icon>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                        </b-row>
                        <b-row align-h="between" class="mx-3 mb-3">
                            <b-col class="mt-2 p-0 d-flex" style="min-width:max-content; max-width:max-content;">
                                <b-checkbox v-model="rememberMe" style="max-width:fit-content;">Lembrar de mim</b-checkbox>
                            </b-col>
                            <div style="width:10px;"></div>
                            <b-col class="mt-2 p-0 d-flex" style="min-width:max-content; max-width:max-content;">
                                <b-link @click="$router.push({name: 'recover'})" style="max-width:fit-content; padding:0px;">
                                    Esqueceu sua senha?
                                </b-link>
                            </b-col>
                        </b-row>
                        <b-row class="mx-3" :class="isMobile ? 'pt-3' : 'pt-4'">
                            <b-button type="submit" variant="success" style="border-radius:8px; padding:10px 0px;" :disabled="loading">
                                <span v-if="loading"><b-spinner small></b-spinner></span>
                                <span v-else>Entrar</span>
                            </b-button>
                        </b-row>
                    </fieldset>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import Utility from '@/utils/Utility';
import cookies from '@/plugins/cookies';
import axios from 'axios';
export default {
    name: 'LoginView',
    data(){
        return {
            isMobile: window.innerWidth < 720,
            loading: false,
            email: '',
            password: '',
            visibility: false,
            rememberMe: false,
        }
    },
    created(){
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
    mounted(){
        setTimeout(()=>{
            this.$refs.inputEmail.focus();
        }, 250)
    },
    computed:{
        isValidEmail(){
            if(!this.email) return null;
            const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
            return regex.test(this.email) ? null : false;
        },
        isValidPassword(){
            if(!this.password) return null;
            return this.password.length >= 6;
        },
    },
    methods:{
        getInstance(){
            const config = { baseURL: process.env.VUE_APP_NT_BASE_URL }
            const instance = axios.create(config)
            return instance
        },
        validateForm(){
            if(!this.isValidEmail && this.isValidEmail!=null){
                this.$refs.inputEmail.focus();
                return false;
            }
            // else if(!this.isValidPassword){
            //     this.$refs.inputPassword.focus();
            //     return false;
            // }
            else return true;
        },
        async login(){
            if(!this.validateForm()) return;

            try{
                this.loading = true;
                
                const instance = this.getInstance();

                var model = {
                    userEmail: this.email,
                    password: this.password,
                }
                
                const response = await instance.post('auth/login', model)
                if(response.data.token) cookies.setToken('Bearer ' + response.data.token)
                if(response.data.userName) cookies.setUsername(response.data.userName)
                if(this.rememberMe) cookies.setEmail(response.data.userEmail)
                

                Utility.successSnackBar("Login realizado com sucesso.", null, ()=>{ this.$router.go() })
            }
            catch(error){
                if(error?.response?.status==404)
                    Utility.errorSnackBar("E-mail e/ou senha não coincidem!")
                else
                    Utility.errorSnackBar("Ocorreu um erro ao realizar o login. Tente novamente!")
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
    /* height:100%;
    width:100%; */
    background-color: #F1FFFA;
    padding: 20px;
}

* /deep/ a {
    color: #0040ff;
}
* /deep/ a:hover {
    color: #0032c8;
}
</style>