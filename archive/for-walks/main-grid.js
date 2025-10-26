import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function initScene(containerId, modelPath) {
    // Create a container div
    const container = document.getElementById(containerId);

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    let object;

    loader.load(
        modelPath,
        function (gltf) {
            object = gltf.scene;
            scene.add(object);

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

        if (controls.mouseButtons.LEFT === THREE.MOUSE.PAN && controls.mouseButtons.MIDDLE === THREE.MOUSE.DOLLY && controls.mouseButtons.RIGHT === THREE.MOUSE.ROTATE) {
            if (controls.mouseButtonsState[THREE.MOUSE.RIGHT]) {
                object.rotation.y += 0.01;
            }
        }

        controls.update();
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
}

// Example usage for two different divs
initScene('scene-container-1', 'public/perfume.gltf');
initScene('scene-container-2', 'public/perfume.gltf');
initScene('scene-container-3', 'public/perfume.gltf');
initScene('scene-container-4', 'public/perfume.gltf');
initScene('scene-container-5', 'public/perfume.gltf');
initScene('scene-container-6', 'public/perfume.gltf');
