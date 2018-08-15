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
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  async asyncData({app}) {
    let sites = await app.$axios.$get('/v1/sites');
    return {
      sites: sites.sites
    }
  },
}
</script>

<style>
</style>

