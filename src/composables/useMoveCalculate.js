import { useMainStore } from "@/store";
import { useEditWay } from "@/composables/useEditWay";

export function useMoveCalculate(ways, figureType) {
  const store = useMainStore();
  const availableWays = {
    1: ["topLeft", "topRight"],
    2: ["bottomLeft", "bottomRight"],
  };
  const availableArr = [];
  ways.forEach((way) => {
    const { cx, cy, position } = way;
    const tableCell = store.table[cy][cx];
    const isAllowed = availableWays[figureType.value].includes(position);
    if (tableCell === 0 && !isAllowed) return;
    else if (tableCell === 0 && isAllowed) {
      return availableArr.push(way);
    } else if (tableCell && tableCell !== figureType.value) {
      return availableArr.push(useEditWay(way));
    }
  });
  return availableArr;
}
