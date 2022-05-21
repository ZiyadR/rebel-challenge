export const getQueryStringValue = (key: string) => {
    const params = new URLSearchParams(window.location.search)
    const value = params.get(key);
    return value;
};

export const getQueryStringParam = (key: string) => {
    const value = getQueryStringValue(key);

    let str = '';
    if (value) str = atob(value);

    return str;
};

export const getQueryIntParam = (key: string) => {
    const value = getQueryStringValue(key);

    let int = 0;
    if (value) int = Number.parseInt(atob(value));

    return int;
};

export const addQueryParam = (url: string, key: string, value: number) => `${url}?${key}=${btoa(value.toString())}`;

export const truncate = (str: string, max: number) => str && str.length > max ? `${str.substring(0, max)} ...` : str;

export const setPageTitle = (title: string) => document.title = ` ${title} - Muawza`;

export const padNumber = (num: number, size = 2) => {
    var s = num.toString()
    while (s.length < size) s = "0" + s
    return s
};

export const compareValues = (key: string, order: 'desc' | 'asc' = 'asc', secondaryKey: string = null) => {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            console.warn("Not all sorting objects have key: ", key)
            return 0;
        }

        let primaryA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        let primaryB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        if (secondaryKey !== null && (typeof a[key] === 'string' || typeof a[key] === a[secondaryKey])) {
            primaryA += (typeof a[secondaryKey] === 'string') ? a[secondaryKey].toUpperCase() : a[secondaryKey];
            primaryB += (typeof b[secondaryKey] === 'string') ? b[secondaryKey].toUpperCase() : b[secondaryKey];
        }

        let comparison = 0;
        if (primaryA > primaryB) {
            comparison = 1;
        } else if (primaryA < primaryB) {
            comparison = -1;
        }

        return (order === 'desc') ? (comparison * -1) : comparison;
    };
}

export const unique = (arr: Array<any>) => {
    if (!arr || arr.length === 0) return [];

    const seen = new Set();

    return arr.filter(el => {
        const duplicate = seen.has(el);
        seen.add(el);
        return !duplicate;
    });
}

export const isEmpty = (obj: object) => !obj || !Object.keys(obj).length;

export const intersect = (arr1: number[], arr2: number[]) => arr1.some(e => arr2.includes(e));

export function groupBy<T>(collection: T[], iteratee: PropertyKey) {
    return collection.reduce((result, value) => {
        const key: PropertyKey = value[iteratee];
        if (result.hasOwnProperty(key)) {
            result[key].push(value);
        } else {
            result[key] = [value];
        }
        return result;
    }, {})
}

export const displayDecimal = (num: number, fractions: number = 6) => num?.toLocaleString('en-US', {
    maximumFractionDigits: fractions
});


export const displayMoney = (num: number, fractions: number = 2) => num?.toLocaleString('en-US', {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: fractions
});