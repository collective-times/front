<template>
  <v-form>
    <v-text-field
            v-model="title"
            label="サイト名"
    ></v-text-field>
    <v-text-field
            v-model="feedUrl"
            label="フィードURL"
    ></v-text-field>
    <v-text-field
            v-model="sourceUrl"
            label="サイトURL"
    ></v-text-field>
    <v-switch
            v-model="crawlable"
            label="クロール"
            color="blue"
            ></v-switch>
    <v-select
      v-model="type"
      :items="types"
      label="種別"
    ></v-select>

    <v-btn
            @click="createSite"
    >Submit</v-btn>

    <v-btn
      @click="$router.push('/sites')"
    >Back</v-btn>
  </v-form>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      title: '',
      feedUrl: '',
      sourceUrl: '',
      crawlable: true,
      type: '',
    }
  },
  async asyncData({app, store}) {
    let contents_parsers = await app.$axios.$get('/v1/contents-parsers');
    return {
      types: _.map(contents_parsers['contents-parsers'], 'type')
    }
  },
  methods: {
    createSite() {
      this.$axios.post('/v1/sites', {
        title: this.title,
        feedUrl: this.feedUrl,
        sourceUrl: this.sourceUrl,
        crawlable: this.crawlable,
        type: this.type,
      }).then(() => {
        console.log('success');
        this.$router.push('/sites');
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style>
</style>

