import * as THREE from "three";
import { animate, clearFns, drawBox, drawFn, drawGrid } from "./rendering";

drawBox(5, 0.05, 0.05);
drawBox(0.05, 5, 0.05);
drawBox(0.05, 0.05, 5);

animate();
drawGrid();

const $: (v: string) => any = (v: string) => document.getElementById(v)!;

const inputs: HTMLInputElement[] = [
    $("vecAx1"),
    $("vecAx2"),
    $("vecAx3"),
    $("vecBx1"),
    $("vecBx2"),
    $("vecBx3"),
];

function renderFunc() {
    const a = new THREE.Vector3(
        Number(inputs[0].value),
        Number(inputs[1].value),
        Number(inputs[2].value)
    );

    const b = new THREE.Vector3(
        Number(inputs[3].value),
        Number(inputs[4].value),
        Number(inputs[5].value)
    );

    drawFn(a, b);
}

$("drawBtn").addEventListener("click", (_: any) => {
    renderFunc();
});

$("clearBtn").addEventListener("click", (_: any) => {
    clearFns();
});
