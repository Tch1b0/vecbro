export function numToHex(n: number): string {
    let hex = n.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function hexToNum(hex: string): number {
    return Number("0x" + hex);
}

export function generateBrightHex(): number {
    let a: number, b: number, c: number;
    do {
        a = Math.floor(Math.random() * 0xff);
        b = Math.floor(Math.random() * 0xff);
        c = Math.floor(Math.random() * 0xff);
    } while (a + b + c < 0x30);
    return hexToNum(`${numToHex(a)}${numToHex(b)}${numToHex(c)}`);
}

export function sleep(time: number): Promise<void> {
    return new Promise((resolve, _) => {
        setTimeout(resolve, time);
    });
}
