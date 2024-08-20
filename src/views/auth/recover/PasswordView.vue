<template>
    <div id="newPassword" :style="isMobile ? 'padding-top:150px;' : ''">
        <b-form @submit.prevent="newPassword" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row>
                    <b-row class="pb-4 mb-2 mt-2">
                        <span style="font-size:20px; font-weight:300;">
                            Crie sua nova senha
                        </span>
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
                    <b-row class="mx-0 mt-4">
                        <b-button type="submit" variant="success" style="border-radius:8px; padding:10px 0px;" :disabled="loading">
                            <span v-if="loading"><b-spinner small></b-spinner></span>
                            <span v-else>Confirmar</span>
                        </b-button>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'PasswordView',
    data(){
        return {
            loading: false,
            password: '',
            confirmPassword: '',
            visibility: false,
            confirmVisibility: false,
            isMobile: window.innerWidth<720,
        }
    },
    created(){
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
    computed:{
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
        async newPassword(){
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
#newPassword{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    width:100%;
}
</style>