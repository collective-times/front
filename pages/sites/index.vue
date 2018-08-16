<template>
  <v-card>
    <v-list two-line>
      <template v-for="(site, index) in sites">
        <v-list-tile
                ripple
                :key="site.title"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ site.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < sites.length" :key="`divider-${index}`"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>

export default {
  middleware: 'auth',
  async asyncData({app, store}) {
    let sites = await app.$axios.$get('/v1/sites');
    return {
      sites: sites.sites
    }
  },
}
</script>

<style>
</style>

