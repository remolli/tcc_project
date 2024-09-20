<template>
  <div id="home" ref="scrollable" class="home d-flex h-100" style="flex-direction:column;" :style="isMobile ? 'margin: 0px 50px;' : 'margin: 0px 100px;'">
    
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

    <div class="my-4 div-nav-tab" :style="isMobile ? 'border-radius:0px;' : ''"
    @mouseover="pauseScroll" @mouseleave="resumeScroll" ref="navbar">
      <NavTabComponent
      :isMobile="isMobile"
      :category="category"
      :list="listTags.length>0 ? listCategory : listCategory.filter(e=>e.en!='Recommended')"
      @change="changeCategory"
      @focus="pauseScroll"
      @blur="resumeScroll"
      />
    </div>  


    <b-col v-if="renderComponent" style="width:100%;" align-self="center" role="tabpanel" :aria-labelledby="category.pt">
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
          @focus=handleUserScroll
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
          @focus=handleUserScroll
          />
        </b-row>
      </ul>
    </b-col>
  </div>
</template>

<script>
import ArticleComponent from './ArticleComponent.vue';
import NavTabComponent from './NavTabComponent.vue';
import Cookies from '@/plugins/cookies';
export default {
  name: 'HomeView',
  components: {
    ArticleComponent,
    NavTabComponent,
  },
  data(){
    return {
      renderComponent: true,
      loading: false,
      isMobile: window.innerWidth<720,
      isScrolling: true,
      scrollInterval: null,
      userScrollTimeout: null,
      scrollSpeed: 1,
      listTags: [],
      copyright: null,
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
  mounted() {
    this.startAutoScroll();
  },
  beforeDestroy() {
    clearInterval(this.scrollInterval);
  },
  async created(){
    window.addEventListener('resize', () => this.isMobile = window.innerWidth<720 );
    this.listTags = Cookies.get() || [];
    if(this.listTags.length){
      this.category = { 
        pt: 'Recomendados', 
        en: 'Recommended'
      };
      this.loadRecommended();
    }
    else await this.loadData(30);
  },
  methods: {
    async forceRender(){
      this.renderComponent=false;
      await this.$nextTick();
      this.renderComponent=true;
    },

    changeCategory(value){
      this.category = value;
      if(this.category.en=="Most popular") this.loadData(30);
      else if(this.category.en=="Recommended") this.loadRecommended();
      else this.search(value.en);
      this.scrollTop();
    },

    async loadRecommended(){
      this.listTags = Cookies.get() || [];
      this.listTags.forEach(tag =>{
        this.search(tag, true);
      });
    },

    async loadData(period){
      try{
        this.queryItems=[];
        this.loading = true;
        const response = await this.$axios.get('mostpopular/v2/emailed/'+period+'.json?'+this.authParam);
        this.copyright = response.data.copyright;
        this.items = response.data.results.filter(e=>e.media[0]?.['media-metadata']?.length>0);
        this.items.forEach(e=>e.image=e.media[0]?.['media-metadata']?.[2]);
        await this.forceRender();
      }
      catch(error){
        console.log(error);
      }
      finally { this.loading = false; }
    },
    async search(value, join=false){
      try{
        this.loading = true;
        const response = await this.$axios.get('search/v2/articlesearch.json?q='+(value || this.query)+'&sort='+this.sort+'&facet='+true+'&'+this.authParam);
        this.copyright = response.data.copyright;
        var filtered = response.data.response.docs.filter(e=>e.multimedia.length>0);
        filtered.forEach(e=>{
          e.image = e.multimedia.find(image=>image.subtype=='xlarge');
          e.image.url = "https://www.nytimes.com/" + e.image.url;
        });
        if(join) this.queryItems.push(...filtered);
        else this.queryItems = filtered;
        await this.forceRender();
      }
      catch(error){
        console.log(error);
      }
      finally { this.loading = false; }
    },

    startAutoScroll() {
      this.scrollInterval = setInterval(() => {
        if (this.isScrolling) {
          const navbar = this.$refs.navbar;
          navbar.scrollBy({
            left: this.scrollSpeed,
            behavior: 'smooth'
          });

          if (navbar.scrollLeft + navbar.clientWidth + 10 >= navbar.scrollWidth) {
            this.pauseScroll()
            navbar.scrollTo({ left: 0, behavior: 'smooth' });
            setTimeout(() => {
              this.resumeScroll();
            }, 1000)
          }
        }
      }, 50);
    },
    pauseScroll() {
      this.isScrolling = false;
    },
    resumeScroll() {
      this.isScrolling = true;
    },
    handleUserScroll() {
      this.pauseScroll();

      // Limpa o timeout anterior se o usuário continuar interagindo
      clearTimeout(this.userScrollTimeout);

      // Define um timeout para retomar o scroll automático após 2 segundos sem interação
      this.userScrollTimeout = setTimeout(() => {
        this.resumeScroll();
      }, 2000); // Ajuste esse tempo conforme necessário
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
  max-width:100vw;
  overflow:auto;
  position:sticky;
  top:105px;
  z-index:2;
  box-shadow: 0px 0px 20px #00000050;
  border-radius:20px;
  scroll-behavior: smooth;
} 
.div-nav-tab::-webkit-scrollbar {
  /* display: none; */
}
</style>