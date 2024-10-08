<template>
    <article role="article" class="my-5" :class="isMobile ? 'py-1 px-4' : 'p-5'" ref="container"
    style="border:4px solid #AAAAAA; background-color:#FAFAFC; border-radius:30px; text-align:start;">
        <b-row class="h-100">

            <b-col :class="isMobile ? 'my-4' : 'mx-4'">
                <div class="w-100 h-100">
                    <b-skeleton-img
                    :style="{
                        'width': '100%',
                        'min-width': isMobile ? '250px' : '300px',
                        'min-height': '100%',
                        'max-height': '350px',
                        'border-radius': '20px',
                        'object-fit': 'cover',
                    }"
                    ></b-skeleton-img>
                </div>
            </b-col>
            <b-col class="d-flex flex-column align-items-start justify-content-between"
            :style="'min-width:' + (isMobile ? 325 : 400) + 'px;'">
                <div class="px-3 w-100">
                    <b-skeleton width="95%" height="40px"></b-skeleton>
                    <b-skeleton width="80%" height="40px"></b-skeleton>
                    <div style="height:30px"></div>
                    <b-skeleton width="98%" height="20px"></b-skeleton>
                    <b-skeleton width="85%" height="20px"></b-skeleton>
                    <b-skeleton width="90%" height="20px"></b-skeleton>
                </div>
                <b-row class="article_content w-100 mt-3 mx-0" align-h="between">
                    <b-col style="max-width: max-content;">
                        <b-badge 
                        pill :style="{
                            'background-color': 'rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+', 0.2)',
                            'font-size': isMobile ? '16px' : '18px',
                            'color': '#454545',
                        }">
                            <b-skeleton width="80px"></b-skeleton>
                        </b-badge>
                    </b-col>
                    <div v-if="isMobile" style="height:15px;"></div>
                    <b-col style="max-width: max-content;">
                        <b-skeleton width="180px"></b-skeleton>
                    </b-col>
                </b-row>
                <div v-if="isMobile" class="py-2"></div>
            </b-col>
        </b-row>
    </article>
</template>

<script>
export default {
    name: "BlankArticleComponent",
    props: {
        isMobile: Boolean,
        type: {
            type: String,
            default: 'popular',
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