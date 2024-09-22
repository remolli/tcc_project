<template>
    <section role="region" style="width:100%; max-width:2000px;" :style="isMobile? 'width:100vw;max-width:100vw;' :''">
        <b-row v-if="!reverse || isMobile" class="about-section mx-0"
        :cols="isMobile ? '1' : '2'"
        :style="'background-color: '+backgroundColor+';' + (isMobile ? 'width:100vw;height:100vh; padding:50px 10px; padding-top:100px;' : 'padding:20px;')"
        align-v="center">
            <b-col>
                <b-row align-h="center"><h1 class="about-title"> {{ title }} </h1></b-row>
                <b-row align-h="center"><span class="about-text"> {{ text }} </span></b-row>
            </b-col>
            <b-col class="d-flex align-items-center justify-content-center">
                <CardPerson :isMobile="isMobile" :name="name" :func="func"/>
            </b-col>
        </b-row>
        <b-row v-else class="about-section" :cols="isMobile ? '1' : '2'" align-v="center" :style="'background-color: '+backgroundColor+';'">
            <b-col class="d-flex align-items-center justify-content-center">
                <CardPerson :name="name" :func="func"/>
            </b-col>
            <b-col>
                <b-row align-h="center"><h1 class="about-title"> {{ title }} </h1></b-row>
                <b-row align-h="center"><span class="about-text"> {{ text }} </span></b-row>
            </b-col>
        </b-row>
    </section>
</template>

<script>
import CardPerson from './CardPerson.vue'

export default {
    name: 'AboutSection',
    components:{
        CardPerson,
    },
    props: {
        isMobile: Boolean,
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
    padding:20px;
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