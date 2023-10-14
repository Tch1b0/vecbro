import { Vector3 } from "three";

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
    } while (a + b + c < 0xaa);
    return hexToNum(`${numToHex(a)}${numToHex(b)}${numToHex(c)}`);
}

export function sleep(time: number): Promise<void> {
    return new Promise((resolve, _) => {
        setTimeout(resolve, time);
    });
}

export function vec(x: number, y: number, z: number): THREE.Vector3 {
    return new Vector3(x, y, z);
}

export function deg2rad(degrees: number): number {
    return (degrees / 360) * Math.PI;
}

export function planeRotationFromVecs(
    dir1: THREE.Vector3,
    dir2: THREE.Vector3
): THREE.Vector3 {
    const o2 = dir2.clone().sub(dir1);
    const x = o2.angleTo(vec(1, 0, 0)),
        y = o2.angleTo(vec(0, 1, 0)),
        z = o2.angleTo(vec(0, 0, 1));

    return vec(x, y, z);
}

export function planeFunc(
    sup: THREE.Vector3,
    dir1: THREE.Vector3,
    dir2: THREE.Vector3
): (r: number, s: number) => THREE.Vector3 {
    const a = sup.clone(),
        b = dir1.clone(),
        c = dir2.clone();
    return (r: number, s: number) => {
        const x = a
            .clone()
            .add(b.clone().multiplyScalar(r))
            .add(c.clone().multiplyScalar(s));
        return x;
    };
}
