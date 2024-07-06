<template>
    <div id="register">
        <b-form @submit.prevent="register">
            <b-col class="px-4 py-5" style="border:3px solid #E1E1E3; border-radius:20px; background:#F9F9FB; width:500px; margin-top:50px;">
                <b-row class="mx-0 pb-4 mb-2">
                    <span style="font-size:20px;">
                        Cadastre sua conta
                    </span>
                </b-row>
                <b-row class="mx-0">
                    <b-form-group label="Nome de usuário" label-for="inputUsername" label-align="start">
                        <b-form-input
                        id="inputUsername"
                        name="inputUsername"
                        type="text"
                        v-model="username"
                        :state="isValidUsername"
                        :disabled="loading"
                        required
                        >
                        </b-form-input>
                    </b-form-group>
                </b-row>
                <div class="py-1"></div>
                <b-row class="mx-0">
                    <b-form-group label="E-mail" label-for="inputEmail" label-align="start">
                        <b-form-input
                        id="inputEmail"
                        name="inputEmail"
                        type="email"
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
                <div class="py-1"></div>
                <b-row class="mx-0">
                    <b-form-group label="Senha" label-for="inputPassword" label-align="start">
                        <b-input-group>
                            <b-form-input
                            id="inputPassword"
                            name="inputPassword"
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
                <div class="py-1"></div>
                <b-row class="mx-0">
                    <b-form-group label="Confirmar Senha" label-for="inputConfirm" label-align="start">
                        <b-input-group>
                            <b-form-input
                            id="inputConfirm"
                            name="inputConfirm"
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
                <div class="py-1"></div>
                <b-row class="mx-0 pt-1 pb-2" align-h="between">
                    <span style="max-width:fit-content">Já possui conta?</span>
                    <b-link to="/login" style="max-width:fit-content">
                        Entrar
                    </b-link>
                </b-row>
                <div class="py-3"></div>
                <b-row class="mx-2">
                    <b-button type="submit" variant="success" style="border-radius:8px;" :disabled="loading">
                        <span v-if="loading"><b-spinner small></b-spinner></span>
                        <span v-else>Cadastrar</span>
                    </b-button>
                </b-row>
            </b-col>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'RegisterView',
    data(){
        return {
            loading: false,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            visibility: false,
            confirmVisibility: false,
        }
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
.eye-button{
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-color: #E1E1E3;
}
</style>