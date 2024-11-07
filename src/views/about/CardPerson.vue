<template>
    <b-col class="about-card-person d-flex flex-column justify-content-center align-items-center p-0">
        <b-row style="height:50%;" align-v="center"><span class="about-card-name" :style="isMobile? 'font-size:18px;' :''"> {{ name }} </span></b-row>
        <div style="width:100%; border-bottom: 3px solid #a5d398;"></div>
        <b-row style="height:50%;" align-v="center"><span class="about-card-func" :style="isMobile? 'font-size:16px;' :''"> {{ func }} </span></b-row>
    </b-col>
</template>

<script>
export default {
    name: 'CardPerson',
    props: {
        isMobile: Boolean,
        name: String,
        func: String,
    },
}
</script>

<style scoped>
.about-card-person{
    background-color: #bff0b2;
    border: 4px solid #a5d398;
    border-radius: 30px;
    max-width: 400px;
    height:125px;
    box-shadow: 0px 5px 30px #00000050;
}
.about-card-name{
    font-size: 20px;
    font-weight: 600;
}
.about-card-func{
    font-size: 20px;
    font-weight: 500;
}
</style>