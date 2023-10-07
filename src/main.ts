import * as THREE from "three";
import {
    animate,
    clearFns,
    drawBox,
    drawCone,
    drawFn,
    drawGrid,
} from "./rendering";

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

// draw x direction
drawBox(5, 0.05, 0.05);
// draw y direction
drawBox(0.05, 5, 0.05);
// draw z direction
drawBox(0.05, 0.05, 5);

// draw x direction arrow
drawCone(new THREE.Vector3(2.5, 0, 0), new THREE.Vector3(0, 0, 1), 4.7);
// draw y direction arrow
drawCone(new THREE.Vector3(0, 2.5, 0), new THREE.Vector3(0, 1, 0), 4.7);
// draw z direction arrow
drawCone(new THREE.Vector3(0, 0, 2.5), new THREE.Vector3(1, 0, 0), -4.7);

animate();
drawGrid();
