<template>
    <div style="width:100%; max-width:2000px;">
        <b-row v-if="!reverse" class="about-section" align-v="center" :style="'background-color: '+backgroundColor+';'">
            <b-col>
                <b-row align-h="center"><h1 class="about-title"> {{ title }} </h1></b-row>
                <b-row align-h="center"><span class="about-text"> {{ text }} </span></b-row>
            </b-col>
            <b-col class="d-flex align-items-center justify-content-center">
                <CardPerson :name="name" :func="func"/>
            </b-col>
        </b-row>
        <b-row v-else class="about-section" align-v="center" :style="'background-color: '+backgroundColor+';'">
            <b-col class="d-flex align-items-center justify-content-center">
                <CardPerson :name="name" :func="func"/>
            </b-col>
            <b-col>
                <b-row align-h="center"><h1 class="about-title"> {{ title }} </h1></b-row>
                <b-row align-h="center"><span class="about-text"> {{ text }} </span></b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import CardPerson from './CardPerson.vue'

export default {
    name: 'AboutSection',
    components:{
        CardPerson,
    },
    props: {
        reverse: Boolean,
        backgroundColor: String,
        title: String,
        text: String,
        name: String,
        func: String,
    },
}
</script>

<style scoped>
.about-section{
    min-height:300px;
    width:100%;
}
.about-title{
    max-width: 600px;
    font-size:22px;
    font-weight: 600;
    text-align: center;
}
.about-text{
    max-width: 600px;
    font-size:18px;
    font-weight: 400;
    text-align: center;
}
</style>