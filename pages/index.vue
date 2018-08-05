<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Collective Times</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(article, index) in articles">
            <v-list-tile
                    ripple
                    :key="article.title"
                    :href="article.articleUrl"
                    target="_blank"
            >
              <v-avatar>
                <img :src="article.imageUrl">
              </v-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ article.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ article.description }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ article.date }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < articles.length" :key="`divider-${index}`"></v-divider>
          </template>
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
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
    // TODO: GETリクエストはクライアントに移植
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
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

