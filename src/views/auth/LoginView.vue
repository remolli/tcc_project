<template>
    <div id="login">
        <b-form @submit.prevent="login">
            <b-col class="px-4 py-5" style="border:3px solid #E1E1E3; border-radius:20px; background:#F9F9FB;">
                <b-row class="mx-0 pb-4 mb-2">
                    <span style="font-size:20px;">
                        Acesse sua conta
                    </span>
                </b-row>
                <b-row class="mx-0">
                    <b-form-group label="E-mail" label-for="inputEmail" label-align="start">
                        <b-form-input
                        id="inputEmail"
                        name="inputEmail"
                        type="email"
                        v-model="email"
                        :state="isValidEmail(email)"
                        :disabled="loading"
                        required
                        >
                        </b-form-input>
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
                <div class="py-1"></div>
                <b-row class="mx-0 pt-1 pb-2" align-h="between">
                    <span style="max-width:fit-content">Não possui conta?</span>
                    <b-link to="/cadastro" style="max-width:fit-content">
                        Cadastre-se
                    </b-link>
                </b-row>
                <div class="py-3"></div>
                <b-row class="mx-2">
                    <b-button type="submit" variant="success" style="border-radius:8px;" :disabled="loading">
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
}
.eye-button{
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-color: #E1E1E3;
}
</style>