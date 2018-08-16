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
            v-model="className"
            label="クラス"
    ></v-text-field>

    <v-btn
            @click="createSite"
    >Submit</v-btn>
  </v-form>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      feedUrl: '',
      sourceUrl: '',
      crawlable: true,
      className: '',
    }
  },
  methods: {
    createSite() {
      this.$axios.post('/v1/sites', {
        title: this.title,
        feedUrl: this.feedUrl,
        sourceUrl: this.sourceUrl,
        crawlable: this.crawlable,
        class: this.className,
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

