<template>
    <div id="recover">
        <RecoverView v-if="step==0" @nextStep="step++"/>
        <PasswordView v-if="step==1" @backStep="step--"/>
    </div>
</template>

<script>
import RecoverView from './RecoverView.vue'
import PasswordView from './PasswordView.vue'

export default {
    name: 'RecoverPage',
    components:{
        RecoverView,
        PasswordView,
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
#recover{
    /* height:100%;
    width:100%; */
    background-color: #F1FFFA;
    padding:20px;
}
</style>