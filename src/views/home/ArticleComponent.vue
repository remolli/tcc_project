<template>
    <article role="article" class="my-5" :class="isMobile ? 'py-1 px-4' : 'p-5'" ref="container"
    style="border:4px solid #AAAAAA; background-color:#FAFAFC; border-radius:30px; text-align:start;">
        <b-row class="h-100">

            <b-col :class="isMobile ? 'my-4' : 'mx-4'">
                <div v-if="type=='popular'" class="w-100 h-100">
                    <img 
                    :src="image.url"
                    width="400"
                    height="350"
                    alt="Imagem da notícia"
                    loading="lazy"
                    :style="{
                        'width': '100%',
                        'min-width': isMobile ? '250px' : '300px',
                        'min-height': '100%',
                        'max-height': '350px',
                        'border-radius': '20px',
                        'object-fit': 'cover',
                    }">
                    <b-row v-for="(item,idx) in media" :key="idx" 
                    class="d-flex justify-content-end align-items-center"> 
                    </b-row>
                </div>
                <div v-else-if="type=='search'" class="w-100 h-100">
                    <img 
                    :src="image.url"
                    width="400"
                    height="350"
                    alt="Imagem da notícia"
                    loading="lazy"
                    :style="{
                        'width': '100%',
                        'min-width': isMobile ? '250px' : '300px',
                        'min-height': '100%',
                        'max-height': '350px',
                        'border-radius': '20px',
                        'object-fit': 'cover',
                    }">
                </div>
            </b-col>
            <b-col class="d-flex flex-column align-items-start justify-content-between"
            :style="'min-width:' + (isMobile ? 325 : 400) + 'px;'">
                <div class="px-3">
                    <h2 class="article_content article-title mb-3"
                    :class="isMobile ? 'article-title-mobile' : 'article-title'"
                    > {{ title || '---' }}  </h2>
                    <span class="article_content article-abstract"
                    :class="isMobile ? 'article-abstract-mobile' : 'article-abstract'"
                    > {{ ( lead_paragraph?.length > abstract?.length ? lead_paragraph : abstract ) || '---' }}  </span>
                </div>
                <b-row class="article_content w-100 mt-3 mx-0" align-h="between">
                    <b-col style="max-width: max-content;">
                        <b-badge v-if="section || subsection" 
                        pill :style="{
                            'background-color': 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+', 0.2)',
                            'font-size': isMobile ? '16px' : '18px',
                            'color': '#454545',
                        }">
                            {{ section || subsection}}
                        </b-badge>
                    </b-col>
                    <div v-if="isMobile" style="height:15px;"></div>
                    <b-col style="max-width: max-content;">
                        <b-link @click.prevent="addCookies(url)" target="_blank" :href="url" :style="isMobile ? 'font-size:16px;' : 'font-size:20px;'"
                        @focus="scrollIntoView">
                            Leia a notícia completa
                            <span class="visually-hidden"> {{title}} </span>
                        </b-link>
                    </b-col>
                </b-row>
                <div v-if="isMobile" class="py-2"></div>
            </b-col>
        </b-row>
    </article>
</template>

<script>
import cookies from '@/plugins/cookies'
export default {
    name: "ArticleComponent",
    props: {
        isMobile: Boolean,
        type: {
            type: String,
            default: 'popular',
        },
        title: String,
        abstract: String,
        lead_paragraph: String,
        section: String,
        subsection: String,
        writtenBy: String,
        image: Object,
        media: Array,
        publishDate: String,
        lastEditDate: String,
        url: String,
    },
    methods: {
        addCookies(url){
            var section = this.section || this.subsection
            cookies.add(section);

            setTimeout(() => {
                window.location.href = url;
            }, 500);
        },
        scrollIntoView() {
            this.$emit('focus')
            setTimeout(()=>{
                const container = this.$refs.container;
                if (container) {
                    container.scrollIntoView({
                        behavior: 'smooth', // Para uma rolagem suave
                        block: 'center',    // Centraliza verticalmente
                        inline: 'center'    // Centraliza horizontalmente
                    });
                }
            }, 50)
        },
    },
}
</script>

<style scoped>
.article-title{
    font-size: 26px;
    font-weight: 500;
    line-height: 36px;
}
.article-title-mobile{
    font-size: 22px;
    font-weight: 500;
    line-height: 30px;
}
.article-abstract{
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
}
.article-abstract-mobile{
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
}
</style>