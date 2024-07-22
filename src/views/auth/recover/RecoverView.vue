<template>
    <div id="recover">
        <b-form @submit.prevent="nextStep" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row>
                    <b-row class="pb-4 mb-2 mt-2">
                        <span style="font-size:20px; font-weight:300;">
                            Recuperar sua senha
                        </span>
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
                        <b-form-group label="Qual nome da sua primeira escola?" label-for="inputFirst" label-align="start">
                            <b-form-input
                            id="inputFirst"
                            name="inputFirst"
                            type="text"
                            placeholder="Digite aqui sua resposta"
                            v-model="first"
                            :state="first ? first.length>=3 : null"
                            :disabled="loading"
                            required
                            >
                            </b-form-input>
                        </b-form-group>
                    </b-row>
                    <b-row>
                        <b-form-group label="Qual nome de solteira da mãe?" label-for="inputSecond" label-align="start">
                            <b-form-input
                            id="inputSecond"
                            name="inputSecond"
                            type="text"
                            placeholder="Digite aqui sua resposta"
                            v-model="second"
                            :state="second ? second.length>=3 : null"
                            :disabled="loading"
                            required
                            >
                            </b-form-input>
                        </b-form-group>
                    </b-row>
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
    name: 'RecoverView',
    data(){
        return {
            loading: false,
            email: '',
            first: '',
            second: '',
        }
    },
    computed:{
        isValidEmail(){
            if(!this.email) return null;
            const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
            return regex.test(this.email);
        },
    },
    methods:{
        async recover(){
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
    background-color: #F1FFFA;
}
</style>