<template>
  <div class="table-cell" @click="moveChecker">
    <div
      v-if="figureType !== 0"
      class="table-cell__figure"
      :class="{
        'table-cell__figure--white': figureType === 1,
        'table-cell__figure--black': figureType === 2,
      }"
      @click.stop="showWay"
    />
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from "vue";
  import { storeToRefs } from "pinia";
  import { useMainStore } from "@/store";

  const emit = defineEmits(["showWay", "moveChecker"]);
  const store = useMainStore();
  const { table, currentChecker } = storeToRefs(store);

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const figureType = ref(props.data.figureType);

  const cx = ref(props.data.cx);
  const cy = ref(props.data.cy);

  const current = reactive({
    cx: cx.value,
    cy: cy.value,
    figureType: figureType.value,
  });

  const isActive = computed(
    () =>
      currentChecker.value &&
      currentChecker.value.cx === current.cx &&
      currentChecker.value.cy === current.cy
  );

  function onTable(way) {
    const { cx, cy } = way;
    return cx >= 0 && cx < 8 && cy >= 0 && cy < 8;
  }

  // метод moveCalculate для расчёта возможных перемещений
  function moveCalculate(ways) {
    //доступные направления для каждого цвета шашек
    const availableWays = {
      1: ["topLeft", "topRight"],
      2: ["bottomLeft", "bottomRight"],
    };

    //отфильтрованный массив разрешённых перемещений
    const availableArr = [];

    ways.forEach((way) => {
      const { cx, cy, position } = way;
      const tableCell = table.value[cy][cx];
      const isAllowed = availableWays[figureType.value].includes(position);

      //ячейка пуста, но неверное направление
      if (tableCell === 0 && !isAllowed) return;
      //ячейка пуста, но верное направление
      else if (tableCell === 0 && isAllowed) {
        return availableArr.push(way);
      }
      //ячейка не пуста и там фигура противоположного цвета
      else if (tableCell && tableCell !== figureType.value) {
        return availableArr.push(editWay(way));
      }
    });

    return availableArr;
  }

  function canMove(way) {
    const { cx, cy } = way;
    return onTable(way) && table.value[cy][cx] === 0;
  }

  function showWay(){
    let ways = [
      {
        position: "topLeft",
        cx: cx.value - 1,
        cy: cy.value - 1,
      },
      {
        position: "topRight",
        cx: cx.value + 1,
        cy: cy.value - 1,
      },
      {
        position: "bottomLeft",
        cx: cx.value - 1,
        cy: cy.value + 1,
      },
      {
        position: "bottomRight",
        cx: cx.value + 1,
        cy: cy.value + 1,
      },
    ].filter((item) => onTable(item));
    ways = moveCalculate(ways).filter((item) => canMove(item));
    emit("showWay", { ways, current });
  };

  function editWay(way) {
    const { cx, cy, position } = way;

    const options = {
      topLeft: (x, y) => ({ cx: x - 1, cy: y - 1 }),
      topRight: (x, y) => ({ cx: x + 1, cy: y - 1 }),
      bottomLeft: (x, y) => ({ cx: x - 1, cy: y + 1 }),
      bottomRight: (x, y) => ({ cx: x + 1, cy: y + 1 }),
    };

    return Object.assign({ position }, options[position](cx, cy));
  }

  function moveChecker() {
    emit("moveChecker", current);
  };
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
        &.table-cell__figure--active {
          box-shadow: 0 0 4px 2px @black;
        }
      }

       &--white {
        background-color: @white;
        &.table-cell__figure--active {
          box-shadow: 0 0 4px 2px @white;
        }
      }
    }
  }
</style>
