<template>
    <div id="register" :style="isMobile ? 'padding-top:150px;' : 'padding-top:60px;'">
        <b-form @submit.prevent="nextStep" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row>
                    <b-row class="pb-4 mb-2 mt-2">
                        <span style="font-size:20px; font-weight:300;">
                            Cadastre-se em Notícia para Todos
                        </span>
                    </b-row>
                    <b-row>
                        <b-form-group label="Nome de usuário" label-for="inputUsername" label-align="start">
                            <b-form-input
                            id="inputUsername"
                            name="inputUsername"
                            type="text"
                            placeholder="Digite aqui seu nome de usuário"
                            v-model="username"
                            :state="isValidUsername"
                            :disabled="loading"
                            required
                            >
                            </b-form-input>
                        </b-form-group>
                    </b-row>
                    <b-row>
                        <b-form-group label="E-mail" label-for="inputEmail" label-align="start">
                            <b-form-input
                            id="inputEmail"
                            name="inputEmail"
                            type="email"
                            placeholder="Digite aqui seu e-mail"
                            v-model="email"
                            :state="isValidEmail"
                            :disabled="loading"
                            required
                            >
                            </b-form-input>
                            <b-form-invalid-feedback :state="isValidEmail" style="text-align:start;">
                                E-mail inválido.
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-row>
                    <b-row>
                        <b-form-group label="Senha" label-for="inputPassword" label-align="start">
                            <b-input-group>
                                <b-form-input
                                id="inputPassword"
                                name="inputPassword"
                                placeholder="Digite aqui sua senha"
                                :type="visibility ? 'text' : 'password'"
                                v-model="password"
                                :state="isValidPassword"
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
                            <b-form-invalid-feedback :state="isValidPassword" style="text-align:start;">
                                Pelo menos 6 caracteres.
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-row>
                    <b-row>
                        <b-form-group label="Confirmar Senha" label-for="inputConfirm" label-align="start">
                            <b-input-group>
                                <b-form-input
                                id="inputConfirm"
                                name="inputConfirm"
                                placeholder="Confirme sua senha"
                                :type="confirmVisibility ? 'text' : 'password'"
                                v-model="confirmPassword"
                                :state="isValidConfirmPassword"
                                :disabled="loading"
                                required
                                >
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button @click="confirmVisibility = !confirmVisibility" variant="outline-secondary" class="eye-button">
                                        <b-icon :icon="confirmVisibility ? 'eye' : 'eye-slash'"></b-icon>
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <b-form-invalid-feedback :state="isValidConfirmPassword" style="text-align:start;">
                                
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-row>
                    <!-- <b-row class="pt-1 pb-2" align-h="center">
                        <span class="p-0" style="max-width:fit-content">Já possui conta?</span>
                        <b-link to="/login" style="max-width:fit-content">
                            Entrar
                        </b-link>
                    </b-row> -->
                    <b-row class="mx-0 mt-4">
                        <b-button type="submit" variant="success" style="border-radius:8px; padding:10px 0px;" :disabled="loading">
                            <span v-if="loading"><b-spinner small></b-spinner></span>
                            <span v-else>Próximo</span>
                        </b-button>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'SecurityView',
    data(){
        return {
            loading: false,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            visibility: false,
            confirmVisibility: false,
            isMobile: window.innerWidth < 720,
        }
    },
    created(){
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
    computed:{
        isValidUsername(){
            if(!this.username) return null;
            return this.username.length >= 3;
        },
        isValidEmail(){
            if(!this.email) return null;
            const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
            return regex.test(this.email);
        },
        isValidPassword(){
            if(!this.password) return null;
            return this.password.length >= 6;
        },
        isValidConfirmPassword(){
            if(!this.confirmPassword) return null;
            return this.confirmPassword == this.password;
        },
    },
    methods:{
        async register(){
            try{
                this.loading = true;
            }
            catch(error){
                console.log(error);
            }
            finally { this.loading = false; }
        },
        nextStep(){
            const modal = {
                username: this.username,
                email: this.email,
                password: this.password,
            }
            this.$emit('nextStep', modal)
        },
    },
}
</script>

<style scoped>
#register{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    width:100%;
}
</style>