import * as THREE from "three";
import { generateBrightHex, sleep } from "./utility";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls";

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.y += 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor("#232323");
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

let funcs: THREE.Line[] = [];

export function drawBox(width: number, height: number, depth: number) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

export function drawFn(sup: THREE.Vector3, dir: THREE.Vector3) {
    const a = dir.clone().multiplyScalar(-100).add(sup);
    const b = dir.clone().add(sup);
    const c = dir.clone().multiplyScalar(100).add(sup);
    const points = [a, b, c];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: generateBrightHex(),
    });
    const m = new THREE.Line(geometry, material);

    scene.add(m);
    funcs.push(m);
}

export async function drawLine(from: THREE.Vector3, to: THREE.Vector3) {
    const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
    const material = new THREE.LineBasicMaterial({
        color: 0xcdcdcd1,
        alphaTest: 0.1,
        transparent: true,
    });
    const m = new THREE.Line(geometry, material);

    scene.add(m);
}

export async function drawGrid() {
    const DELAY = 25;
    for (let i = 0; i <= 10; i++) {
        drawLine(
            new THREE.Vector3(-5 + i, 0, -5),
            new THREE.Vector3(-5 + i, 0, 5)
        );
        await sleep(DELAY);
    }
    for (let i = 0; i <= 10; i++) {
        drawLine(
            new THREE.Vector3(0, -5, -5 + i),
            new THREE.Vector3(0, 5, -5 + i)
        );
        await sleep(DELAY);
    }

    for (let i = 0; i <= 10; i++) {
        drawLine(
            new THREE.Vector3(0, -5 + i, -5),
            new THREE.Vector3(0, -5 + i, 5)
        );
        await sleep(DELAY);
    }
    for (let i = 0; i <= 10; i++) {
        drawLine(
            new THREE.Vector3(-5, 0, -5 + i),
            new THREE.Vector3(5, 0, -5 + i)
        );
        await sleep(DELAY);
    }

    // x3
    for (let i = 0; i <= 10; i++) {
        drawLine(
            new THREE.Vector3(-5 + i, -5, 0),
            new THREE.Vector3(-5 + i, 5, 0)
        );
        await sleep(DELAY);
    }
    for (let i = 0; i <= 10; i++) {
        drawLine(
            new THREE.Vector3(-5, -5 + i, 0),
            new THREE.Vector3(5, -5 + i, 0)
        );
        await sleep(DELAY);
    }
}

camera.position.z = 5;

const CENTER = new THREE.Vector3(0, 0, 0);
const SPEED = 0.001;
let t = 0;

export function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // camera.position.x = CENTER.x + 6 * Math.cos(SPEED * t);
    // camera.position.z = CENTER.z + 6 * Math.sin(SPEED * t);
    // camera.lookAt(CENTER);
    controls.update();

    // t++;
}

export function clearFns() {
    for (const fn of funcs) {
        scene.remove(fn);
    }
    funcs = [];
}
