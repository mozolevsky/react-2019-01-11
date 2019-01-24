export const applyFiltering = (
    titles,
    dateStart,
    dateEnd
) => entity => {
    let isTitleFilteringPassed = true
    let isDateStartFilteringPassed = true
    let isDateEndFilteringPassed = true

    if (titles.length) {
        isTitleFilteringPassed = titles.map(v => v.label).includes(entity.title)
    }

    if (dateStart) {
        isDateStartFilteringPassed = new Date(entity.date) >= dateStart
    }

    if (dateEnd) {
        isDateEndFilteringPassed = new Date(entity.date) <= dateEnd
    }
    
    return isTitleFilteringPassed && isDateStartFilteringPassed && isDateEndFilteringPassed
}