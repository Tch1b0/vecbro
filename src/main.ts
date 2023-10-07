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
$("drawBtn").addEventListener("click", (_: any) => renderFunc());
$("clearBtn").addEventListener("click", (_: any) => clearFns());

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

// -=[ Drawing ]=-

const AXIS_LENGTH = 5;
const AXIS_WIDTH = 0.05;

// draw x direction
drawBox(AXIS_LENGTH, AXIS_WIDTH, AXIS_WIDTH);
// draw y direction
drawBox(AXIS_WIDTH, AXIS_LENGTH, AXIS_WIDTH);
// draw z direction
drawBox(AXIS_WIDTH, AXIS_WIDTH, AXIS_LENGTH);

// 270 deg rotation
const CONE_ROTATION = Math.PI * 1.5;

// draw x direction arrow
drawCone(
    new THREE.Vector3(2.5, 0, 0),
    new THREE.Vector3(0, 0, 1),
    CONE_ROTATION
);
// draw y direction arrow
drawCone(
    new THREE.Vector3(0, 2.5, 0),
    new THREE.Vector3(0, 1, 0),
    CONE_ROTATION
);
// draw z direction arrow
drawCone(
    new THREE.Vector3(0, 0, 2.5),
    new THREE.Vector3(1, 0, 0),
    -CONE_ROTATION
);

animate();
drawGrid();
