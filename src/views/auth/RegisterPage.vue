<template>
    <div id="register">
        <RegisterView v-show="step==0" @nextStep="step++"/>
        <SecurityView v-show="step==1" @backStep="step--"/>
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
            step: 0,
        }
    },
    methods: {
        nextStep(user){
            this.user = user;
            this.step++
        },
        backStep(){
            this.step--;
        },
    }
}
</script>

<style scoped>
#register{
    height:100%;
    width:100%;
}
</style>