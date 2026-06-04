<template>
  <div class="app">
    <div class="app__container">
      <UserInfo
        :user="userStore.userWhite"
        :isActive="currentPlayer === 1"
        class="app__user"
      />
      <CheckersTable class="app__table" />
      <UserInfo
        :user="userStore.userBlack"
        :isActive="currentPlayer === 2"
        class="app__user"
      />
    </div>
  </div>
</template>

<script setup>
  import CheckersTable from "@/components/CheckersTable.vue";
  import UserInfo from "@/components/UserInfo.vue";
  import { computed } from "vue";

  import { useUserStore } from "@/store/user";
  import { useMainStore } from "@/store";

  const userStore = useUserStore();

  const store = useMainStore();
  const currentPlayer = computed(() => store.currentPlayer);
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
