import * as THREE from "three";
import { generateBrightHex, planeFunc, sleep, vec } from "./utility";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls";

// -=[ three.js Setup ]=-

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.y = 3;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor("#232323");
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

let funcs: (THREE.Line | THREE.Mesh)[] = [];

// -=[ Scene/Renderer Functions ]=-

export function clearFns() {
    for (const fn of funcs) {
        scene.remove(fn);
    }
    funcs = [];
}

export function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

// -=[ Drawing Functions ]=-

export function drawPoint(pos: THREE.Vector3) {
    const radius = 0.05;
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshBasicMaterial({
        color: generateBrightHex(),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pos.x, pos.y, pos.z);

    scene.add(mesh);
    funcs.push(mesh);
    console.log("[Rendering] Sphere rendered.");
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
    const lineMesh = new THREE.Line(geometry, material);

    scene.add(lineMesh);
    funcs.push(lineMesh);
    console.log("[Rendering] Line rendered.");
}

export function drawPlane(
    sup: THREE.Vector3,
    dir1: THREE.Vector3,
    dir2: THREE.Vector3
) {
    const f = planeFunc(dir1, dir2);

    const vertices: number[] = [
        ...f(-1, -1).toArray(),
        ...f(-1, 1).toArray(),
        ...f(1, -1).toArray(),
        ...f(1, 1).toArray(),
    ];

    const geometry = new THREE.PolyhedronGeometry(
        vertices,
        [0, 1, 2, 2, 1, 3],
        10,
        1
    );

    const material = new THREE.MeshBasicMaterial({
        color: generateBrightHex(),
        opacity: 0.1,
        transparent: true,
        side: THREE.DoubleSide,
    });

    const m = new THREE.Mesh(geometry, material);
    m.position.set(sup.x, sup.y, sup.z);

    scene.add(m);
    funcs.push(m);
    console.log("[Rendering] Plane rendered.");
}

// -=[ Drawing Grid ]=-

export function drawBox(width: number, height: number, depth: number) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const cube = new THREE.Mesh(geometry, whiteMaterial);

    scene.add(cube);
}

export function drawCone(
    position: THREE.Vector3,
    rotationAxis: THREE.Vector3,
    rotationDegrees: number
) {
    const geometry = new THREE.ConeGeometry(0.1, 1);
    const cone = new THREE.Mesh(geometry, whiteMaterial);

    cone.position.set(position.x, position.y, position.z);
    cone.setRotationFromAxisAngle(rotationAxis, rotationDegrees);

    scene.add(cone);
}

export function drawLine(from: THREE.Vector3, to: THREE.Vector3) {
    const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
    const material = new THREE.LineBasicMaterial({
        color: 0xcdcdcd,
        opacity: 0.5,
        transparent: true,
    });

    const m = new THREE.Line(geometry, material);

    scene.add(m);
}

export async function drawGrid(delay: number = 25) {
    for (let i = 0; i <= 10; i++) {
        drawLine(vec(-5 + i, 0, -5), vec(-5 + i, 0, 5));
        await sleep(delay);
    }
    for (let i = 0; i <= 10; i++) {
        drawLine(vec(0, -5, -5 + i), vec(0, 5, -5 + i));
        await sleep(delay);
    }

    for (let i = 0; i <= 10; i++) {
        drawLine(vec(0, -5 + i, -5), vec(0, -5 + i, 5));
        await sleep(delay);
    }
    for (let i = 0; i <= 10; i++) {
        drawLine(vec(-5, 0, -5 + i), vec(5, 0, -5 + i));
        await sleep(delay);
    }

    for (let i = 0; i <= 10; i++) {
        drawLine(vec(-5 + i, -5, 0), vec(-5 + i, 5, 0));
        await sleep(delay);
    }
    for (let i = 0; i <= 10; i++) {
        drawLine(vec(-5, -5 + i, 0), vec(5, -5 + i, 0));
        await sleep(delay);
    }
}
