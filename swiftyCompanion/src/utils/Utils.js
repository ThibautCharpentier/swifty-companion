export function getDecimal(number) {
    const tab = number.toString().split(".")
    return tab.length == 2 ? tab[1] : "0"
}
