export async function delay(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
}

export const formatTimeUnits = (age: number, unit: string): string | null => {
    let ageDescription: string | null = '';

    switch (unit) {
        case 'year':
            if (age === 1) {
                ageDescription = '1 rok';
            } else if (age % 10 === 2 || age % 10 === 3 || age % 10 === 4) {
                ageDescription = `${age} lata`;
            } else {
                ageDescription = `${age} lat`;
            }
            break;
        case 'month':
            ageDescription = (age === 1) ? '1 miesiąc' : `${age} miesięcy`;
            break;
        case 'day':
            ageDescription = (age === 1) ? '1 dzień' : `${age} dni`;
            break;
        default:
            ageDescription = null;
            break;
    }

    return ageDescription;
}

export const formatPrice = (price: number | null): string | null => {
    return price ? `${price} zł` : 'Oddam za darmo';
}
