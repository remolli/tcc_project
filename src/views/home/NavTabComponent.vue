<template>
    <b-row role="tablist" class="nav-category m-0" align-h="between" :style="isMobile ? 'border-radius:0px;' : ''">
        <b-button v-for="item,idx in list" :key="idx+item.en"
        @click="$emit('change', item)" variant="light" role="tab" 
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        :aria-selected="String(category.en==item.en)"
        class="py-2"
        :class="category.en==item.en ? 'nav-desktop-button-active' : ''"
        style="max-width:max-content;"
        >{{ item.pt }}</b-button>
    </b-row>
</template>

<script>
export default {
    name: 'NavTabComponent',
    props:{
        isMobile: Boolean,
        list: Array,
        category: Object,
    }
}
</script>

<style scoped>
.nav-category{
    background-color: #BAF1AB;
    padding:10px 20px;
    border-radius:20px;
    min-width: 1000px;
    overflow: auto;
}
.nav-button-link{
    color: #555;
    text-decoration: none;
    border-radius: 6px;
}
.nav-button-link:hover{ color: black; }
.nav-desktop-button-active{
    color: black !important;
    font-weight:500 !important;
    border: 2px solid #2E9A40 !important;
    background-color: #D6FFE7 !important;
}
</style>