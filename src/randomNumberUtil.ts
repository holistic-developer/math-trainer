export function getRandomInt(min: number, max: number): number {
    const randomBuffer = new Uint32Array(1);

    window.crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    return Math.floor(randomNumber * (max - min + 1)) + min;
}

export function getRandomIntExcept(min: number, max: number, not: number[]): number {
    if (min == max) {
        return min;
    }
    let result = getRandomInt(min, max);
    while (not.includes(result)) {
        result = getRandomInt(min, max);
    }
    return result;
}