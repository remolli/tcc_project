<template>
  <div id="home" class="home d-flex" style="flex-direction:column;" :style="isMobile ? 'margin: 0px 50px;' : 'margin: 0px 100px;'">

    <b-row class="m-0 pb-3" align-v="center" align-h="between"
    :style="isMobile 
    ? 'padding-top:125px;'
    : 'margin:0px 80px; padding-top:125px;'" 
    :cols="isMobile ? 1 : null"
    >
      <b-col 
      class="d-flex justify-content-center"
      :style="isMobile
      ? 'width:100%;'
      : 'min-width:700px; width:100%'
      ">
        <h1 
        :style="isMobile
        ? 'font-size:38px; font-weight:600; letter-spacing:-2.5px; text-align:center;'
        : 'font-size:80px; font-weight:600; letter-spacing:-6px; text-align:start;'
        ">
          Notícias para Todos
        </h1>
      </b-col>
      <b-col class="d-flex justify-content-center mt-3" style="width:100%;">
        <img src="@/assets/home_image.svg" 
        style="min-width:250px; max-width:250px;" alt="Mulher na cadeira usando notebook com um amigo">
      </b-col>
    </b-row>

    <div class="my-4 div-nav-tab" :style="isMobile ? 'border-radius:0px;' : ''">
      <NavTabComponent
      :isMobile="isMobile"
      :category="category"
      :list="listCategory"
      @change="changeCategory"
      />
    </div>


    <b-col style="width:100%;" align-self="center" role="tabpanel" :aria-labelledby="category.pt">
      <ul class="p-0 px-1">
        <b-row v-for="(item,idx) in filteredItems" :key="idx" class="m-0" align-h="center">
          <ArticleComponent :isMobile="isMobile"
          v-if="queryItems.length>0"
          type="search"
          :title="item.headline.main"
          :section="item.section_name"
          :subsection="item.subsection_name"
          :abstract="item.abstract"
          :lead_paragraph="item.lead_paragraph"
          :writtenBy="item.byline.original"
          :publishDate="item.pub_date"
          :lastEditDate="item.updated"
          :image="item.image"
          :url="item.web_url"
          />
          <ArticleComponent :isMobile="isMobile"
          v-else
          type="popular"
          :title="item.title"
          :section="item.section"
          :subsection="item.subsection"
          :abstract="item.abstract"
          :writtenBy="item.byline"
          :publishDate="item.published_date"
          :lastEditDate="item.updated"
          :image="item.image"
          :url="item.url"
          />
        </b-row>
      </ul>
    </b-col>
  </div>
</template>

<script>
import ArticleComponent from './ArticleComponent.vue';
import NavTabComponent from './NavTabComponent.vue';
export default {
  name: 'HomeView',
  components: {
    ArticleComponent,
    NavTabComponent,
  },
  data(){
    return {
      loading: false,
      isMobile: window.innerWidth<720,
      items: [],
      queryItems: [],
      query: '',
      sort: 'relevance',
      sortOptions: [ 'relevance', 'newest', 'oldest' ],
      listCategory: [ 
        { 
          pt: 'Mais populares', 
          en: 'Most popular'
        },
        // { 
        //   pt: 'Recomendados', 
        //   en: 'Recommended'
        // },
        { 
          pt: 'Tecnologia', 
          en: 'Tech'
        },
        { 
          pt: 'Saúde', 
          en: 'Health'
        },
        { 
          pt: 'Economia', 
          en: 'Economy'
        },
        { 
          pt: 'Esportes', 
          en: 'Sports'
        },
        { 
          pt: 'Política', 
          en: 'Politic'
        },
      ],
      category: { 
        pt: 'Mais populares', 
        en: 'Most popular'
      },
    }
  },
  computed: {
    filteredItems(){
      if(this.queryItems.length>0)
        return this.queryItems;
      else
        return this.items;
    },
  },
  async created(){
    window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    await this.loadData(30);
  },
  methods: {
    changeCategory(value){
      this.category = value;
      if(this.category.en=="Most popular") this.loadData(30);
      else this.search(value.en);
      console.log(value);
    },
    async loadData(period){
      try{
        this.queryItems=[];
        this.loading = true;
        const response = await this.$axios.get('mostpopular/v2/emailed/'+period+'.json');
        console.log(response);
        this.items = response.data.results.filter(e=>e.media[0]?.['media-metadata']?.length>0);
        this.items.forEach(e=>e.image=e.media[0]?.['media-metadata']?.[2]);
      }
      catch(error){
        console.log(error);
      }
      finally { this.loading = false; }
    },
    async search(value){
      try{
        this.loading = true;
        const response = await this.$axios.get('search/v2/articlesearch.json?q='+(value || this.query)+'&sort='+this.sort+'&facet='+true);
        var filtered = response.data.response.docs.filter(e=>e.multimedia.length>0);
        filtered.forEach(e=>{
          e.image = e.multimedia.find(image=>image.subtype=='xlarge');
          e.image.url = "https://www.nytimes.com/" + e.image.url;
        });
        console.log('Search filtered');
        console.log(filtered);
        this.queryItems = filtered;
      }
      catch(error){
        console.log(error);
      }
      finally { this.loading = false; }
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
</script>

<style scoped>
#home{
  display: flex;
  justify-content: center;
  height:100%;
  width:100%;
  max-width:1300px;
}
.prepend-button{
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-color: #E1E1E3;
}
.between-button{
  border-radius: 0px;
  border-color: #E1E1E3;
}
.append-button{
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-color: #E1E1E3;
  background-color: #E1E1E3;
}

.div-nav-tab{
  max-width:100vw;
  overflow:auto;
  position:sticky;
  top:105px;
  z-index:2;
  box-shadow: 0px 0px 20px #00000050;
  border-radius:20px;
} 
.div-nav-tab::-webkit-scrollbar {
  display: none;
}
</style>