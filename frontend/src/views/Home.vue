<template>
  <div class="home">
    <div class="homeinner">
      Homepage test
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.homeinner {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  padding: 0 30px 30px 30px;
}
</style>
