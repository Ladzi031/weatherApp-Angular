export function validateCityName(cityName:string) : boolean {
    let containsLetters = /^[a-zA-Z]+$/;
    return containsLetters.test(cityName); 
}