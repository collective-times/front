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
    <v-text-field
            v-model="type"
            label="種別"
    ></v-text-field>

    <v-btn
            @click="createSite"
    >Submit</v-btn>

    <v-btn
      @click="$router.push('/sites')"
    >Back</v-btn>
  </v-form>
</template>

<script>

export default {
  middleware: 'auth',
  data() {
    return {
      title: '',
      feedUrl: '',
      sourceUrl: '',
      crawlable: true,
      type: '',
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

