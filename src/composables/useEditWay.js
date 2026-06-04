export function useEditWay(way) {
    const { cx, cy, position } = way;
    const options = {
        topLeft: (x, y) => ({ cx: x - 1, cy: y - 1 }),
        topRight: (x, y) => ({ cx: x + 1, cy: y - 1 }),
        bottomLeft: (x, y) => ({ cx: x - 1, cy: y + 1 }),
        bottomRight: (x, y) => ({ cx: x + 1, cy: y + 1 }),
    };
    return Object.assign({ position }, options[position](cx, cy));
}
