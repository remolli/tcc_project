<template>
    <div id="security" style="padding-top:50px;">
        <b-form @submit.prevent="security" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <header role="banner">
                        <b-row align-h="center">
                            <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                        </b-row>
                        <b-row class="pb-4 mb-2 mt-2">
                            <h1 style="font-size:20px; font-weight:300;">
                                Responda as perguntas de segurança
                            </h1>
                        </b-row>
                    </header>
                    <fieldset role="form">
                        <b-row>
                            <b-form-group label="Qual nome da sua primeira escola?" label-for="inputFirst" label-align="start">
                                <b-form-input
                                id="inputFirst"
                                name="inputFirst"
                                ref="inputFirst"
                                type="text"
                                placeholder="Digite aqui sua resposta"
                                v-model="first"
                                :state="first ? first.length>=3 : null"
                                :aria-invalid="first ? !first.length>=3 : null"
                                aria-errormessage="errorFirst"
                                :disabled="loading"
                                required
                                >
                                </b-form-input>
                                <b-form-invalid-feedback id="errorFirst" :state="first ? first.length>=3 : null" style="text-align:start;">
                                    Pelo menos 3 caracteres.
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-row>
                        <b-row>
                            <b-form-group label="Qual nome de solteira da mãe?" label-for="inputSecond" label-align="start">
                                <b-form-input
                                id="inputSecond"
                                name="inputSecond"
                                ref="inputSecond"
                                type="text"
                                placeholder="Digite aqui sua resposta"
                                v-model="second"
                                :state="second ? second.length>=3 : null"
                                :aria-invalid="second ? !second.length>=3 : null"
                                aria-errormessage="errorSecond"
                                :disabled="loading"
                                required
                                >
                                </b-form-input>
                                <b-form-invalid-feedback id="errorSecond" :state="second ? second.length>=3 : null" style="text-align:start;">
                                    Pelo menos 3 caracteres.
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-row>
                        <b-row class="mx-0 mt-4">
                            <b-button @click="backStep" type="button" variant="success" style="border-radius:8px; padding:10px 0px; background-color:transparent; color:#198754;" :disabled="loading">
                                <span>Voltar</span>
                            </b-button>
                        </b-row>
                        <b-row class="mx-0 mt-2">
                            <b-button type="submit" variant="success" style="border-radius:8px; padding:10px 0px;" :disabled="loading">
                                <span v-if="loading"><b-spinner small></b-spinner></span>
                                <span v-else>Cadastrar</span>
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
import axios from 'axios';
export default {
    name: 'RegisterView',
    props:{
        user: Object,
        answers: Object,
    },
    data(){
        return {
            loading: false,
            first: '',
            second: '',
        }
    },
    created(){
        this.first = this.answers?.first;
        this.second = this.answers?.second;
    },
    mounted(){
        this.$refs.inputFirst.focus();
    },
    methods:{
        getInstance(){
            const config = { baseURL: process.env.VUE_APP_NT_BASE_URL }
            const instance = axios.create(config)
            return instance
        },
        backStep(){
            var modal = {
                first: this.first,
                second: this.second
            }
            this.$emit('backStep', modal);
        },
        validateForm(){
            if(!this.first.length>=3){
                this.$refs.inputFirst.focus();
                return false;
            }
            else if(!this.second.length>=3){
                this.$refs.inputSecond.focus();
                return false;
            }
            else return true;
        },
        async security(){
            if(!this.validateForm()) return;

            try{
                this.loading = true;

                const instance = this.getInstance();

                var modal={
                    userName: this.user.username,
                    password: this.user.password,
                    email: this.user.email,
                    firstQuestion: this.first,
                    secondQuestion: this.second,
                }

                await instance.post('users/cadastro', modal);

                Utility.successSnackBar("Registro realizado com sucesso!", null, ()=>{ this.$router.push("/login") });
            }
            catch(error){
                if(error?.response?.status==409)
                    Utility.errorSnackBar("Nome de usuário ou e-mail já existe.");
                else Utility.errorSnackBar("Ocorreu um erro ao realizar o registro. Tente novamente!");
            }
            finally { this.loading = false; }
        },
    },
}
</script>

<style scoped>
#security{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    width:100%;
}
</style>