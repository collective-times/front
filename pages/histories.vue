<template>
  <v-card>
    <v-list two-line>
      <template v-for="(history, index) in histories">
        <v-list-tile
                ripple
                :key="history.article.title"
                :href="history.article.articleUrl"
                target="_blank"
                v-bind:class="{ non_hatena: !isHatena(history.article.sourceTitle) }"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="history.article.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="history.article.description"></v-list-tile-sub-title>
            <v-list-tile-sub-title v-html="(history.article.date + ' ' + history.article.sourceTitle)"></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-avatar class="mr-2">
            <img :src="article.imageUrl" v-if="article.imageUrl">
          </v-avatar>
        </v-list-tile>
        <v-divider v-if="index + 1 < history.article.length" :key="`divider-${index}`"></v-divider>
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
    let histories = await app.$axios.$get('/v1/histories');
    return {
      histories: histories.histories
    }
  },
  methods: {
    infiniteHandler($state) {
      this.page++;
      this.$axios.$get('/v1/histories?page=' + this.page)
        .then((response) => {
          this.histories = this.histories.concat(response.histories);
          $state.loaded();
        }).catch(function (error) {
          // handle error
          console.log(error);
        })
    },
    isHatena(string) {
      return string.match(/.*はてな.*/)
    }
  }
}
</script>

<style>
.non_hatena {
  background: #d5f9b6;
}
</style>

