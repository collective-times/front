<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="$router.push('/')">
          <v-list-tile-action>
            <v-icon>list_alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Articles</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <template v-if="isLogined()">
          <v-list-tile @click="$router.push('/sites')">
            <v-list-tile-action>
              <v-icon>info</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sites</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <template v-if="isLogined()">
          <v-list-tile @click="$router.push('/history')">
            <v-list-tile-action>
              <v-icon>history</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>History</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <template v-else>
          <v-list-tile @click="$router.push('/login')">
            <v-list-tile-action>
              <v-icon>assignment_ind</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      color="cyan"
      dark
      fixed
      app
      >
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Collective Times</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content app>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    }
  },
  methods: {
    isLogined() {
      return this.$store.state.accessToken != null
    }
  }
}

</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

