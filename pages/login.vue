<template>
  <v-container>
    <v-form>
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
  </v-container>
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

