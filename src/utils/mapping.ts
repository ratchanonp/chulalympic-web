export function getInitialLetter<T extends { name: string }>(obj: T, shift?: number): string {

    if (!shift) shift = 0;

    while (isThaiVowel(obj.name[shift])) shift++;

    return obj.name[shift];
}

export function isThaiVowel(letter: string): boolean {
    return "เแโใไ".indexOf(letter) >= 0;
}

export function getInitialLetters<T extends { name: string }>(objs: T[]): string[] {
    return objs
        .map(obj => obj.name[0])
        .filter((letter, index, letters) => letters.indexOf(letter) === index)
        .sort((a, b) => a.localeCompare(b, "th"));
}

export function filterByInitialLetter<T extends { name: string }>(letter: string, objs: T[]): T[] {
    return objs.filter(obj => obj.name[0] === letter);
}


