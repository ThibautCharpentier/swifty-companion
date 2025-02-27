export function getDecimal(number) {
    const tab = number.toString().split(".")
    return tab.length == 2 ? tab[1] : "0"
}

export function findCursus(tab_cursus) {
    if (!tab_cursus || tab_cursus.length < 1)
        return null
    for (let i = 0; i < tab_cursus.length; i++) {
        if (tab_cursus[i].cursus_id == 21)
            return tab_cursus[i]
    }
    return null
}
