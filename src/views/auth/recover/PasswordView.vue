<template>
    <div id="newPassword" :style="isMobile ? 'padding-top:150px;' : ''">
        <b-form @submit.prevent="newPassword" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row>
                    <b-row class="pb-4 mb-2 mt-2">
                        <h1 style="font-size:20px; font-weight:300;">
                            Crie sua nova senha
                        </h1>
                    </b-row>
                    <b-row>
                        <b-form-group label="Nova Senha" label-for="inputPassword" label-align="start">
                            <b-input-group>
                                <b-form-input
                                id="inputPassword"
                                name="inputPassword"
                                ref="inputPassword"
                                placeholder="Digite aqui sua nova senha"
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
                                aria-errormessage="errorConfirm"
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
                            <b-form-invalid-feedback id="errorConfirm" :state="isValidConfirmPassword" style="text-align:start;">
                                As senhas não coincidem
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
import Utility from '@/utils/Utility';
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
    mounted(){
        this.$refs.inputPassword.focus();
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
        validateForm(){
            if(!this.isValidPassword){
                this.$refs.inputPassword.focus();
                return false;
            }
            else if(!this.isValidConfirmPassword){
                this.$refs.inputConfirm.focus();
                return false;
            }
            else return true;
        },
        async newPassword(){
            if(!this.validateForm()) return;

            try{
                this.loading = true;
                Utility.successSnackBar("Nova senha atualizada com sucesso!");
            }
            catch(error){
                console.log(error);
                Utility.errorSnackBar("Ocorreu um erro ao atualizar sua senha. Tente novamente!");
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