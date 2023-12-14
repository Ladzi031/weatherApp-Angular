export function validateCityName(cityName: string): boolean {
    let containsLettersOnly: RegExp = /^[a-zA-Z]+$/;
    return containsLettersOnly.test(cityName);
}