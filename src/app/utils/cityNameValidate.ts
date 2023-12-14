export function validateCityName(cityName: string): boolean {
    let containsLettersOnly: RegExp = /^[^\d\s]*[^\d][^\d\s]*$/;
    return containsLettersOnly.test(cityName);
}
// at one letter and no numbers, can also be more than one word (e.g new york)
/*
something interesting:
  city with one of the shortest name in the world is "Å" located in Norway.
*/