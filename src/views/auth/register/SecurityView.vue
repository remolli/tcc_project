<template>
    <div id="security" style="padding-top:50px;">
        <b-form @submit.prevent="security" style="width:100%;">
            <b-row align-h="center">
                <b-col style="max-width:500px; width:100%;">
                    <b-row align-h="center">
                        <img class="logo-large" src="@/assets/logo.svg" alt="Logo Notícia para Todos">
                    </b-row>
                    <b-row class="pb-4 mb-2 mt-2">
                        <span style="font-size:20px; font-weight:300;">
                            Responda as perguntas de segurança
                        </span>
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
                        <b-button @click="$emit('backStep')" type="button" variant="success" style="border-radius:8px; padding:10px 0px; background-color:transparent; color:#198754;" :disabled="loading">
                            <span v-if="loading"><b-spinner small></b-spinner></span>
                            <span v-else>Voltar</span>
                        </b-button>
                    </b-row>
                    <b-row class="mx-0 mt-2">
                        <b-button type="submit" variant="success" style="border-radius:8px; padding:10px 0px;" :disabled="loading">
                            <span v-if="loading"><b-spinner small></b-spinner></span>
                            <span v-else>Cadastrar</span>
                        </b-button>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'RegisterView',
    data(){
        return {
            loading: false,
            first: '',
            second: '',
        }
    },
    computed:{
    },
    methods:{
        async security(){
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
#security{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    width:100%;
}
</style>