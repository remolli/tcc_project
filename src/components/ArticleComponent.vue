<template>
    <div class="px-5 py-4 my-3" style="border:1px solid #E1E1E3; background-color:#FAFAFC; border-radius:8px; text-align:start;">
        <b-col>
            <b-row v-for="(item,idx) in media" :key="idx" 
            class="d-flex justify-content-end align-items-center" style="flex-direction:row-reverse;"> 
                <img v-for="(image,idx) in item['media-metadata']" :key="idx" 
                :src="image.url" 
                :style="{
                    'max-width': image.width+'px',
                    'max-height': image.height+'px',
                    'border-radius': '20px',
                    'object-fit': 'contain',
                }">
            </b-row>
            <b-row class="article_content"> Title:  {{ title || '---' }}  </b-row>
            <b-row class="article_content"> Abstract:  {{ abstract || '---' }}  </b-row>
            <b-row class="article_content"> Section:  {{ section || '---' }}  </b-row>
            <b-row class="article_content"> Subsection:  {{ subsection || '---' }}  </b-row>
            <b-row class="article_content"> {{ writtenBy || '---' }}  </b-row>
            <b-row class="article_content"> Published at:  {{ publishDate || '---' }}  </b-row>
            <b-row class="article_content"> Last updated at:  {{ lastEditDate || '---' }}  </b-row>
            <b-row class="article_content"> Url:  {{ url || '---' }}  </b-row>
        </b-col>
    </div>
</template>

<script>
export default {
    name: "ArticleComponent",
    props: {
        type: {
            type: String,
            default: 'popular',
        },
        title: String,
        abstract: String,
        section: String,
        subsection: String,
        writtenBy: String,
        media: Array,
        publishDate: String,
        lastEditDate: String,
        url: String,
    },
}
</script>

<style>

</style>