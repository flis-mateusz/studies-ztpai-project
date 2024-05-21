export async function delay(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
}

export const formatTimeUnits = (age: number, unit: string): string | null => {
    let ageDescription: string | null = '';

    if (!age) {
        return 'Nieznany'
    }

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
            break;
    }

    return ageDescription;
}

export const formatPrice = (price: number | null): string | null => {
    return price ? `${price} zł` : 'Oddam za darmo';
}

export const formatDateTime = (datetime: string) => {
    return new Date(datetime).toLocaleString()
}

export const absoluteServerPath = (path: string) => {
    return 'http://localhost:8082' + (path?.startsWith('/') ? path : '/' + path);
}

export const formatGenderType = (gender: string) => {
    switch (gender) {
        case 'male':
            return 'On';
        case 'female':
            return 'Ona';
    }
}