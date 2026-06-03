<template>
  <div class="table-cell">
    <div
      v-if="figureType !== 0"
      class="table-cell__figure"
      :class="{
        'table-cell__figure--white': figureType === 1,
        'table-cell__figure--black': figureType === 2
      }"
    />
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const figureType = ref(props.data.figureType);
</script>

<style lang="less">
  .table-cell {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;

    &__figure {
      box-sizing: border-box;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid @gray;
      cursor: pointer;

      &--black {
        background-color: @black;
      }

      &--white {
        background-color: @white;
      }
    }
  }
</style>
