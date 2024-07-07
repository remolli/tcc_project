<template>
  <div id="home" class="home d-flex" style="flex-direction:column">

    <b-row style="padding-top:125px;" class="pb-3" align-h="center">
      <b-form-group style="max-width:500px;">
        <b-input-group>
          <b-input-group-prepend>
            <b-button class="prepend-button" disabled style="border-color:#e1e1e3; border-right:none; background-color: transparent; color: #aaa">
              <b-icon icon="search"></b-icon>
            </b-button>
          </b-input-group-prepend>
          <b-form-input
          id="inputSearchQuery"
          name="inputSearchQuery"
          type="text"
          placeholder="Search"
          v-model="query"
          style="border-left:none;"
          required
          >
          </b-form-input>
          <b-input-group-append>
            <b-form-select
            id="inputSortQuery"
            name="inputSortQuery"
            class="between-button px-2"
            style="height:100%; width:125px;"
            v-model="sort"
            >
              <option :value="item" v-for="item in sortOptions" :key="item"> {{ capitalize(item) }} </option>
            </b-form-select>
          </b-input-group-append>
          <b-input-group-append>
            <b-button @click="search" :disabled="loading" variant="outline-secondary" class="append-button px-3">
              <b-icon icon="search"></b-icon>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-row>


    <b-col style="width:90%;" align-self="center">
      <b-row v-for="(item,idx) in filteredItems" :key="idx" class="m-0" align-h="center">
        <ArticleComponent
        v-if="queryItems.length>0"
        :title="item.headline.main"
        />
        <!-- :subtitle=""
        :section=""
        :subsection=""
        :abstract=""
        :writtenBy=""
        :publishDate=""
        :lastEditDate=""
        :media=""
        :url="" -->
        <ArticleComponent
        v-else
        :title="item.title"
        :section="item.section"
        :subsection="item.subsection"
        :abstract="item.abstract"
        :writtenBy="item.byline"
        :publishDate="item.published_date"
        :lastEditDate="item.updated"
        :media="item.media"
        :url="item.url"
        />
      </b-row>
    </b-col>
  </div>
</template>

<script>
import ArticleComponent from '@/components/ArticleComponent.vue';
export default {
  name: 'HomeView',
  components: {
    ArticleComponent,
  },
  data(){
    return {
      loading: false,
      items: [],
      queryItems: [],
      query: '',
      sort: 'relevance',
      sortOptions: [ 'relevance', 'newest', 'oldest' ],
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
    await this.loadData(7);
  },
  methods: {
    async loadData(period){
      try{
        this.loading = true;
        const response = await this.$axios.get('mostpopular/v2/emailed/'+period+'.json');
        console.log(response);
        this.items = response.data.results;
      }
      catch(error){
        console.log(error);
      }
      finally { this.loading = false; }
    },
    async search(){
      try{
        this.loading = true;
        const response = await this.$axios.get('search/v2/articlesearch.json?q='+this.query+'&sort='+this.sort);
        console.log(response);
        this.queryItems = response.data.response.docs;
        // docs - meta - facets
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
  /* display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width:100%; */
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
</style>