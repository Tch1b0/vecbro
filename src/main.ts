import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.y += 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function drawLine(width: number, height: number, depth: number) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function drawFn(sup: THREE.Vector3, dir: THREE.Vector3) {
    const a = dir.clone().multiplyScalar(-100).add(sup);
    const b = dir.clone().add(sup);
    const c = dir.clone().multiplyScalar(100).add(sup);
    const points = [a, b, c];
    console.log(points);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xfc02a2 });
    const m = new THREE.Line(geometry, material);

    scene.add(m);
}

drawLine(5, 0.05, 0.05);
drawLine(0.05, 5, 0.05);
drawLine(0.05, 0.05, 5);

drawFn(new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 1, 1));
drawFn(new THREE.Vector3(1, 3, 0), new THREE.Vector3(-1.5, 2, -1));

camera.position.z = 5;

const CENTER = new THREE.Vector3(0, 0, 0);
const SPEED = 0.001;
let t = 0;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    camera.position.x = CENTER.x + 6 * Math.cos(SPEED * t);
    camera.position.z = CENTER.z + 6 * Math.sin(SPEED * t);
    camera.lookAt(CENTER);

    t++;
}
animate();
