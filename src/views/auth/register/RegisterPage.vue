<template>
    <div id="register">
        <RegisterView v-if="step==0" @nextStep="nextStep" :user="user"/>
        <SecurityView v-if="step==1" @backStep="backStep" :answers="answers"/>
    </div>
</template>

<script>
import RegisterView from './RegisterView.vue'
import SecurityView from './SecurityView.vue'

export default {
    name: 'RegisterPage',
    components:{
        RegisterView,
        SecurityView,
    },
    data(){
        return {
            user: null,
            answers: null,
            step: 0,
        }
    },
    methods: {
        nextStep(user){
            this.user = user;
            this.step++
        },
        backStep(answers){
            this.answers = answers;
            this.step--;
        },
    }
}
</script>

<style scoped>
#register{
    height:100%;
    width:100%;
    padding:20px;
    background-color: #F1FFFA;
}
</style>