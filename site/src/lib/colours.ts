export function auto(length: number) {
    return (i: number) => `hsl(${(360 / (length)) * i}, 48%, 48%)`
}