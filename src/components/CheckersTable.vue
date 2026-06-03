<template>
  <div class="checkers-table">
    <div
      v-for="(row, rowIndex) in table"
      class="checkers-table__row"
      :key="rowIndex"
    >
      <TableCell
        v-for="(cell, cellIndex) in row"
        :key="rowIndex + '-' + cellIndex + '-' + cell"
        :data="{figureType: cell}"
        class="checkers-table__cell"
      />
    </div>
  </div>
</template>

<script setup>
  import TableCell from "@/components/TableCell.vue";
  import { storeToRefs } from "pinia";
  import { useMainStore } from "@/store";

  const store = useMainStore();
  const { table } = storeToRefs(store);
</script>

<style lang="less">
  .checkers-table {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 800px;
    border: 1px solid @gray;

    &__row {
      display: flex;
      width: 100%;

      &:nth-child(2n) {
        .checkers-table__cell:nth-child(2n + 1) {
          background-color: @brown;
        }
      }

      &:nth-child(2n + 1) {
        .checkers-table__cell:nth-child(2n) {
          background-color: @brown;
        }
      }
    }
  }
</style>
