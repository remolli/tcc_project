<template>
    <div id="register" :style="isMobile ? 'padding-top:150px;' : 'padding-top:60px;'">
        <b-form @submit.prevent="nextStep" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row>
                    <b-row class="pb-4 mb-2 mt-2">
                        <h1 style="font-size:20px; font-weight:300;">
                            Cadastre-se em Notícia para Todos
                        </h1>
                    </b-row>
                    <b-row>
                        <b-form-group label="Nome de usuário" label-for="inputUsername" label-align="start">
                            <b-form-input
                            id="inputUsername"
                            name="inputUsername"
                            ref="inputUsername"
                            type="text"
                            placeholder="Digite aqui seu nome de usuário"
                            v-model="username"
                            :state="isValidUsername"
                            :aria-invalid="username ? !isValidUsername : null"
                            aria-errormessage="errorUsername"
                            :disabled="loading"
                            required
                            >
                            </b-form-input>
                            <b-form-invalid-feedback id="errorUsername" :state="isValidUsername" style="text-align:start;">
                                Pelo menos 3 caracteres.
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-row>
                    <b-row>
                        <b-form-group label="E-mail" label-for="inputEmail" label-align="start">
                            <b-form-input
                            id="inputEmail"
                            name="inputEmail"
                            ref="inputEmail"
                            type="email"
                            placeholder="Digite aqui seu e-mail"
                            v-model="email"
                            :state="isValidEmail"
                            :aria-invalid="email ? !isValidEmail : null"
                            aria-errormessage="errorEmail"
                            :disabled="loading"
                            required
                            >
                            </b-form-input>
                            <b-form-invalid-feedback id="errorEmail" :state="isValidEmail" style="text-align:start;">
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
                                ref="inputPassword"
                                placeholder="Digite aqui sua senha"
                                :type="visibility ? 'text' : 'password'"
                                v-model="password"
                                :state="isValidPassword"
                                :aria-invalid="password ? !isValidPassword : null"
                                aria-errormessage="errorPassword"
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
                            <b-form-invalid-feedback id="errorPassword" :state="isValidPassword" style="text-align:start;">
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
                                ref="inputConfirm"
                                placeholder="Confirme sua senha"
                                :type="confirmVisibility ? 'text' : 'password'"
                                v-model="confirmPassword"
                                :state="isValidConfirmPassword"
                                :aria-invalid="confirmPassword ? !isValidConfirmPassword : null"
                                aria-errormessage="errorConfirmPassword"
                                :disabled="loading"
                                required
                                >
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button @click="confirmVisibility = !confirmVisibility" variant="outline-secondary" class="eye-button"
                                    :aria-label="confirmVisibility ? 'Esconder confirmação de senha' : 'Visualizar confirmação de senha'">
                                        <b-icon :icon="confirmVisibility ? 'eye' : 'eye-slash'"></b-icon>
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <b-form-invalid-feedback id="errorConfirmPassword" :state="isValidConfirmPassword" style="text-align:start;">
                                As senhas não coincidem.
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
    props: {
        user: Object
    },
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
        this.username = this.user?.username;
        this.email = this.user?.email;
        this.password = this.user?.password;
        this.confirmPassword = this.user?.password;
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
    mounted(){
        setTimeout(()=>{
            this.$refs.inputUsername.focus();
        }, 250)
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
        validateForm(){
            if(!this.isValidUsername){
                this.$refs.inputUsername.focus();
                return false;
            }
            else if(!this.isValidEmail){
                this.$refs.inputEmail.focus();
                return false;
            }
            else if(!this.isValidPassword){
                this.$refs.inputPassword.focus();
                return false;
            }
            else if(!this.isValidConfirmPassword){
                this.$refs.inputConfirm.focus();
                return false;
            }
            else return true;
        },
        nextStep(){
            if(!this.validateForm()) return;

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