<template>
  <v-container>
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
              @click="updateSite($route.params.id)"
      >Submit</v-btn>

      <v-dialog
        width="500"
      >
        <v-btn
                color="warning"
                slot="activator"
        >Delete</v-btn>

        <v-card>
          <v-card-text>
            Are you sure to delete?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="deleteSite($route.params.id)"
            >
            Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <br />
      <v-btn
        @click="$router.push('/sites')"
      >Back</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import _ from 'lodash';

export default {
  middleware: 'auth',
  data() {
    return {
    }
  },
  async asyncData({app, store, params}) {
    let site = await app.$axios.get('/v1/sites/' + params.id);
    // console.log("site: " + JSON.stringify(site));
    let contents_parsers = await app.$axios.$get('/v1/contents-parsers');
    return {
      types: _.map(contents_parsers['contents-parsers'], 'type'),
      title: site.data.site.title,
      feedUrl: site.data.site.feedUrl,
      sourceUrl: site.data.site.sourceUrl,
      crawlable: site.data.site.crawlable,
      type: site.data.site.type,
    }
  },
  methods: {
    updateSite(site_id) {
      this.$axios.put('/v1/sites/' + site_id, {
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
    },
    deleteSite(site_id) {
      this.$axios.delete('/v1/sites/' + site_id).then(() => {
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

