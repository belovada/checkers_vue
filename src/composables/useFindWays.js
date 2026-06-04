import { useOnTable } from "@/composables/useOnTable";
import { useCanMove } from "@/composables/useCanMove";
import { useMoveCalculate } from "@/composables/useMoveCalculate";

export function useFindWays(emit, cx, cy, figureType, current) {
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
    ].filter((item) => useOnTable(item));
    ways = useMoveCalculate(ways, figureType).filter((item) => useCanMove(item));
    emit("showWay", { ways, current });
}
