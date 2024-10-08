<template>
    <main role="main" id="about" class="d-flex" :style="isMobile? 'flex-direction:column; overflow-x:hidden;' :'margin-top:70px;'">
        <AboutSection :backgroundColor="'#BDE3CA'"
        :isMobile="isMobile"
        title="Sobre nós"
        text="Notícia para Todos é um portal de notícias dedicado a fornecer informações acessíveis e inclusivas para todas as pessoas, independentemente de suas habilidades físicas, sensoriais ou cognitivas."
        name="Evandro Remolli"
        func="Desenvolvedor Front-End"
        />

        <AboutSection reverse
        :isMobile="isMobile"
        title="Missão"
        text="Nossa missão é garantir que todos tenham acesso a informações de qualidade de forma equitativa. Acreditamos que a informação é um direito fundamental e, portanto, deve ser acessível a todos."
        name="Kelvin Pedroza"
        func="Desenvolvedor Back-End"
        />

        <AboutSection :backgroundColor="'#BDE3CA'"
        :isMobile="isMobile"
        title="Visão"
        text="Visamos ser o portal de notícias de referência em acessibilidade, promovendo a inclusão digital e garantindo que nossas plataformas sejam utilizáveis por todos, sem barreiras."
        name="David Medeiros"
        func="Design UI/UX"
        />

        <AboutSection reverse
        :isMobile="isMobile"
        title="Compromisso com a Acessibilidade"
        text="Nosso compromisso com a acessibilidade inclui a implementação de práticas recomendadas, como o uso de textos alternativos para imagens, navegação por teclado, design responsivo e utilização de bibliotecas focadas em acessibilidade."
        name="Eduardo Eler"
        func="Design UI/UX"
        />

        <AboutSection :backgroundColor="'#BDE3CA'"
        :isMobile="isMobile"
        title="História"
        text="O projeto Noticia para Todos nasceu como parte do nosso Trabalho de Conclusão de Curso (TCC). Identificamos a falta de plataformas verdadeiramente acessíveis e decidimos fazer a diferença, desenvolvendo um site que atende às necessidades de todos os usuários."
        name="João Roberto"
        func="Infraestrutura DevOps"
        />
    </main>
</template>

<script>
import AboutSection from './AboutSection.vue'
export default {
    name: 'AboutView',
    components: {
        AboutSection,
    },
    data(){
        return {
            isMobile: window.innerWidth < 720,
        }
    },
    created(){
        window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    },
}
</script>

<style scoped>
#about{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height:100%;
    width:100%;
    background-color: #F1FFFA;
}
</style>