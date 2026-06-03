<template>
  <div class="app">
    <div class="app__container">
      <CheckersTable class="app__table" />
    </div>
  </div>
</template>

<script setup>
  import CheckersTable from "@/components/CheckersTable.vue";
</script>

<style lang="less">
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__container {
      display: flex;
    }
  }
</style>
