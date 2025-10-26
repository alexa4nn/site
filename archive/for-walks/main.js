import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a container div
const container = document.getElementById('scene-container');

// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Adjusted the aspect ratio
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight); // Set size based on container
container.appendChild(renderer.domElement);

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

let object; // Variable to hold the loaded 3D object

loader.load(
    'public/perfume.gltf',
    function (gltf) {
        object = gltf.scene;
        scene.add(object);

        // Optional: If you have animations, you can play them
        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.log('An error happened', error);
    }
);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    // Rotate the object if the mouse is being held down
    if (controls.mouseButtons.LEFT === THREE.MOUSE.PAN && controls.mouseButtons.MIDDLE === THREE.MOUSE.DOLLY && controls.mouseButtons.RIGHT === THREE.MOUSE.ROTATE) {
        if (controls.mouseButtonsState[THREE.MOUSE.RIGHT]) {
            object.rotation.y += 0.01; // Adjust the rotation speed as needed
        }
    }

    controls.update(); // Update controls
    render();
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    render();
}

window.addEventListener('resize', onWindowResize);

animate();
