export function validateCityName(cityName: string): boolean {
    let containsLettersOnly = /^[a-zA-Z]+$/;
    return containsLettersOnly.test(cityName);
}