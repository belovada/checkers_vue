import { useOnTable } from "@/composables/useOnTable";
import { useMainStore } from "@/store";

export function useCanMove(way) {
    const store = useMainStore();
    const { cx, cy } = way;
    return useOnTable(way) && store.table[cy][cx] === 0;
}
