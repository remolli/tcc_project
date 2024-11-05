<template>
  <div id="home" ref="scrollable" class="home d-flex h-100" style="flex-direction:column;" >
    
    <header role="banner">
      <b-row class="m-0 pb-3 h-100" align-v="center" align-h="between"
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
    </header>

    <div class="my-4 div-nav-tab" :style="isMobile ? 'border-radius:0px;' : ''" ref="navbar">
      <nav role="navigation" style="padding:0px;">
        <NavTabComponent
        :isMobile="isMobile"
        :category="category"
        :list="listTags.length>0 ? listCategory : listCategory.filter(e=>e.en!='Recommended')"
        @change="changeCategory"
        />
      </nav>
    </div>  


    <b-col v-if="renderComponent" style="width:100%;" align-self="center" role="tabpanel" :aria-labelledby="category.pt">
      <main role="main" class="p-0 px-1">
        <div v-if="filteredItems.length==0">
          <b-row v-for="(item,idx) in [0,0,0,0,0,0,0,0,0,0,0]" :key="idx" class="m-0" align-h="center">
            <BlankArticleComponent :isMobile="isMobile"/>
          </b-row>
        </div>
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
      </main>
    </b-col>
  </div>
</template>

<script>
import Cookies from '@/plugins/cookies';
export default {
  name: 'HomeView',
  components: {
    ArticleComponent: () => import('./ArticleComponent.vue'),
    BlankArticleComponent: () => import('./BlankArticleComponent.vue'),
    NavTabComponent: () => import('./NavTabComponent.vue'),
  },
  data(){
    return {
      renderComponent: true,
      loading: false,
      isMobile: window.innerWidth<720,
      listTags: [],
      items: [],
      queryItems: [],
      query: '',
      sort: 'relevance',
      sortOptions: [ 'relevance', 'newest', 'oldest' ],
      authParam: 'api-key='+process.env.VUE_APP_TOKEN_API,
      listCategory: [ 
        { 
          pt: 'Mais populares', 
          en: 'Most popular'
        },
        { 
          pt: 'Recomendados', 
          en: 'Recommended'
        },
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
  mounted(){
    this.listTags = Cookies.get() || [];
    // if(this.listTags.length){
    //   this.category = { 
    //     pt: 'Recomendados', 
    //     en: 'Recommended'
    //   };
    //   this.loadRecommended();
    // }
    // else 
    this.loadData(30);
    window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
  },
  methods: {
    async forceRender(){
      this.renderComponent=false;
      await this.$nextTick();
      this.renderComponent=true;
    },

    changeCategory(value){
      this.category = value;
      if(this.category.en=="Most popular") this.loadData(30, true);
      else if(this.category.en=="Recommended") this.loadRecommended(true);
      else this.search(value.en, false, true);
      this.scrollTop();
    },

    async loadRecommended(selected=false){
      this.listTags = Cookies.get() || [];
      var temp = [...this.listTags].reverse();
      temp.forEach(tag =>{
        this.search(tag, true, selected);
      });
    },

    async loadData(period, selected=false){
      try{
        this.queryItems=[];
        this.loading = true;
        const response = await this.$axios.get('mostpopular/v2/viewed/'+period+'.json?'+this.authParam);
        this.items = response.data.results.filter(e=>e.media[0]?.['media-metadata']?.length>0)
        // this.items = response.data.results.filter(e=>e.media[0]?.['media-metadata']?.length>0).splice(0, 10);
        this.items.forEach(e=>e.image=e.media[0]?.['media-metadata']?.[2]);
        if(selected){
          this.focusFirstArticle();
        }
        await this.forceRender();
      }
      catch(error){ error; }
      finally { this.loading = false; }
    },
    async search(value, join=false, selected=false){
      try{
        this.loading = true;
        const response = await this.$axios.get('search/v2/articlesearch.json?q='+(value || this.query)+'&sort='+this.sort+'&facet='+true+'&'+this.authParam);
        var filtered = response.data.response.docs.filter(e=>e.multimedia.length>0);
        filtered.forEach(e=>{
          e.image = e.multimedia.find(image=>image.subtype=='xlarge');
          e.image.url = "https://www.nytimes.com/" + e.image.url;
        });
        var tempList = [];
        if(join) tempList.push(...filtered);
        else tempList = filtered;
        tempList.sort(() => Math.random() - 0.5);
        this.queryItems = tempList
        // this.queryItems = tempList.splice(0, 10)
        if(selected){
          this.focusFirstArticle();
        }
        await this.forceRender();
      }
      catch(error){ error; }
      finally { this.loading = false; }
    },
    focusFirstArticle(){
      const link = document.querySelector('article a');
      if(link) link.focus();
    },
    scrollTop(){
      window.scrollTo({
        top: this.isMobile ? 370 : 330,
        behavior: 'smooth'
      })
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  }
}
</script>

<style scoped>
#home{
  display: flex;
  justify-content: flex-start;
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
  border-radius:20px;
  max-width:100vw;
  overflow:auto;
  position:sticky;
  /* top:105px; */
  top:75px;
  z-index:2;
  box-shadow: 0px 0px 20px #00000050;
  scroll-behavior: smooth;
} 
/* .div-nav-tab::-webkit-scrollbar {
  display: none;
} */
</style>