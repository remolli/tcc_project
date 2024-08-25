<template>
    <div id="recover" style="padding-top:50px;">
        <b-form @submit.prevent="nextStep" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row>
                    <b-row class="pb-4 mb-2 mt-2">
                        <h1 style="font-size:20px; font-weight:300;">
                            Recuperar sua senha
                        </h1>
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
                                Pelomenos 3 caracteres
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
                                Pelomenos 3 caracteres
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-row>
                    <b-row class="mx-0 mt-4">
                        <b-button @click="$router.push({name: 'login'})" type="button" variant="outline-success" 
                        style="border-radius:8px; padding:10px 0px; background-color:transparent; color:#198754;" :disabled="loading">
                            <span v-if="loading"><b-spinner small></b-spinner></span>
                            <span v-else>Voltar</span>
                        </b-button>
                    </b-row>
                    <b-row class="mx-0 mt-2">
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
    name: 'RecoverView',
    data(){
        return {
            loading: false,
            email: '',
            first: '',
            second: '',
        }
    },
    mounted(){
        this.$refs.inputEmail.focus();
    },
    computed:{
        isValidEmail(){
            if(!this.email) return null;
            const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
            return regex.test(this.email);
        },
    },
    methods:{
        validateForm(){
            if(!this.isValidEmail){
                this.$refs.inputEmail.focus();
                return false;
            }
            else if(!(this.first.length>=3)){
                this.$refs.inputFirst.focus();
                return false;
            }
            else if(!(this.second.length>=3)){
                this.$refs.inputSecond.focus();
                return false;
            }
            else return true;
        },
        nextStep(){
            if(!this.validateForm()) return;

            const modal = {
                email: this.email,
                first: this.first,
                second: this.second,
            }
            this.$emit('nextStep', modal)
        },
    },
}
</script>

<style scoped>
#recover{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    width:100%;
}
</style>