<template>
  <div id="app">
    <router-view /> <!-- This will display the current route's component -->
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  margin: 20px;
}
</style>
