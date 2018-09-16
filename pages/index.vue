<template>
  <v-card>
    <v-list two-line>
      <template v-for="(article, index) in articles">
        <v-list-tile
                ripple
                :key="article.title"
                target="_blank"
                @click="saveHistoryAndRedirect(article)"
                v-bind:class="{ non_hatena: !isHatena(article.sourceTitle) }"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="article.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="article.description"></v-list-tile-sub-title>
            <v-list-tile-sub-title v-html="(article.date + ' ' + article.sourceTitle)"></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-avatar class="mr-2">
            <img :src="article.imageUrl" v-if="article.imageUrl">
          </v-avatar>
        </v-list-tile>
        <v-divider v-if="index + 1 < articles.length" :key="`divider-${index}`"></v-divider>
      </template>
      <no-ssr>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </no-ssr>
    </v-list>
  </v-card>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      page: 1
    }
  },
  async asyncData({app}) {
    let articles = await app.$axios.$get('/v1/articles');
    return {
      articles: articles.articles
    }
  },
  methods: {
    infiniteHandler($state) {
      this.page++;
      this.$axios.$get('/v1/articles?page=' + this.page)
        .then((response) => {
          this.articles = this.articles.concat(response.articles);
          $state.loaded();
        }).catch(function (error) {
          // handle error
          console.log(error);
        })
    },
    isHatena(string) {
      return string.match(/.*はてな.*/)
    },
    async saveHistoryAndRedirect(article) {
      window.open(article.articleUrl, '_blank');

      await this.$axios.post('/v1/histories', {
        article_id: article.key,
      });
    }
  }
}
</script>

<style>
.non_hatena {
  background: #d5f9b6;
}
</style>

