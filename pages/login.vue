<template>
  <v-form>
    <v-toolbar color="cyan" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Collective Times</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-text-field
            v-model="email"
            label="E-Mail"
    ></v-text-field>
    <v-text-field
            v-model="password"
            :type="'password'"
            label="Password"
            counter
    ></v-text-field>

    <v-btn
            @click="login"
    >Submit</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.email,
          password: this.password,
        })
        this.$router.push('/sites');
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>

<style>
</style>

