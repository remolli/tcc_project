<template>
    <footer role="contentinfo">
        <b-row align-h="center" class="w-100 py-4 footer" :class="isMobile ? '' : 'fixed'">
            <p style="margin:0px;">Developed by <b>Notícia para Todos</b> |
            Copyright (c) {{ year }} <b>The New York Times Company</b>. All Rights Reserved.</p>
        </b-row>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
    props: {
        copyright: String,
    },
    data(){
        return {
            isMobile: window.innerWidth<720,
            year: new Date().getFullYear(),
        }
    },
    created(){
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
}
</script>

<style scoped>
.fixed{
    position: fixed;
    bottom:0px;
    right:0px;
    left:0px;
}
.footer{
    background-color: #bff0b2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:5px 20px;
    width:100%;
    z-index: 10;
    box-shadow: 0px -10px 20px #15202530;
    border-top: 4px solid #a5d398;
}
</style>