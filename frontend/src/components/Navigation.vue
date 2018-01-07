<template>
  <nav>
    <router-link v-if="!$store.state.user.isAuthenticated" to="login">Login</router-link>
    <router-link v-if="!$store.state.user.isAuthenticated" to="register">Register</router-link>
    <router-link v-if="$store.state.user.isAuthenticated" to="logout">Logout</router-link>
  </nav>
</template>

<script>
export default {
  name: 'navigation'
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  padding: 0 15px;

  a {
    &:first-of-type {
      padding-left: 0px;
    }

    padding: 0 5px;
  }
}
</style>
