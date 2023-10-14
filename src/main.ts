import {
    animate,
    clearFns,
    drawBox,
    drawCone,
    drawFn,
    drawGrid,
    drawPlane,
} from "./rendering";
import { vec } from "./utility";

const $: (v: string) => any = (v: string) => document.getElementById(v)!;
const $$: (v: string) => any = (v: string) => document.querySelectorAll(v)!;
$("drawBtn").addEventListener("click", (_: any) => renderFunc());
$("clearBtn").addEventListener("click", (_: any) => clearFns());

const inputs: HTMLInputElement[] = [
    $("vecAx1"),
    $("vecAx2"),
    $("vecAx3"),
    $("vecBx1"),
    $("vecBx2"),
    $("vecBx3"),
    $("vecCx1"),
    $("vecCx2"),
    $("vecCx3"),
];

const vectypeSelection: HTMLSelectElement = $("vectype");

const vectypeChangeCallback = () => {
    const v = vectypeSelection.value;
    // select every element where the `condition="plane"` property exists
    const els = $$('[condition="plane"]');

    const shouldBeDisplayed = v === "plane";

    for (const el of els) {
        el.style.display = shouldBeDisplayed ? "block" : "none";
    }
};
vectypeSelection.addEventListener("change", (e) => vectypeChangeCallback());

vectypeChangeCallback();

function renderFunc() {
    if (vectypeSelection.value === "line") {
        const a = vec(
            Number(inputs[0].value),
            Number(inputs[1].value),
            Number(inputs[2].value)
        );

        const b = vec(
            Number(inputs[3].value),
            Number(inputs[4].value),
            Number(inputs[5].value)
        );

        drawFn(a, b);
    } else {
        const a = vec(
            Number(inputs[0].value),
            Number(inputs[1].value),
            Number(inputs[2].value)
        );

        const b = vec(
            Number(inputs[3].value),
            Number(inputs[4].value),
            Number(inputs[5].value)
        );

        const c = vec(
            Number(inputs[6].value),
            Number(inputs[7].value),
            Number(inputs[8].value)
        );

        drawPlane(a, b, c);
    }
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
drawCone(vec(2.5, 0, 0), vec(0, 0, 1), CONE_ROTATION);
// draw y direction arrow
drawCone(vec(0, 2.5, 0), vec(0, 1, 0), CONE_ROTATION);
// draw z direction arrow
drawCone(vec(0, 0, 2.5), vec(1, 0, 0), -CONE_ROTATION);

animate();
drawGrid();
