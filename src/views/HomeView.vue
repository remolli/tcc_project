<template>
  <div class="home">
    <b-col style="padding-top:100px;">
      <b-row v-for="(item,idx) in items" :key="idx" class="m-0" align-h="center">
        {{ item.title }}
      </b-row>
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data(){
    return {
      items: []
    }
  },
  async created(){
    await this.loadData();
  },
  methods: {
    async loadData(){
      const response = await this.$axios.get('mostpopular/v2/emailed/7.json');
      console.log(response);
      this.items = response.data.results;
    },
  }
}
</script>
