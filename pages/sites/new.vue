<template>
  <v-form>

    <v-toolbar color="cyan" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Collective Times</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

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
}
</script>

<style>
</style>

