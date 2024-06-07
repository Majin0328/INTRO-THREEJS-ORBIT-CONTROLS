import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer;
//permite inicializar todo el escenario
init();
//render(); // remove when using animation loop

function init() {

    scene = new THREE.Scene();
    //mandamos la escena a la consola
    scene.background = new THREE.Color(0xd56d645);
    scene.fog = new THREE.FogExp2(0x2ea11f, 0.002);
    console.log(scene);
//el antialias define mejor las figuras 3d, eliminando dientes de cierra
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //busca que el pixel del dibujo cpincida con el pixel de pantalla en tamano
    renderer.setPixelRatio(window.devicePixelRatio);
    //tamano de la animacion sera el mismo de la pantalla
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(400, 200, 0);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
//amortigua el movimiento
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.5;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // world

    const coneGeometry = new THREE.ConeGeometry(11, 50, 4, 1);
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x9cdb25, flatShading: true });
    const baseGeometry = new THREE.BoxGeometry(7, 30, 7);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513, flatShading: true });

    for (let i = 0; i < 1000; i++) {

        const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
        const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
        const x = Math.random() * 1600 - 800;
        const z = Math.random() * 1600 - 800;

        coneMesh.position.set(x, 25, z); // Eleva el cono para que esté sobre la base
        baseMesh.position.set(x, 1, z);  // La base queda justo en el suelo

        coneMesh.updateMatrix();
        baseMesh.updateMatrix();
        coneMesh.matrixAutoUpdate = false;
        baseMesh.matrixAutoUpdate = false;

        scene.add(coneMesh);
        scene.add(baseMesh);
    }

    // Generar óvalos blancos a 250 metros de altura
    const ovalGeometry = new THREE.SphereGeometry(10, 32, 32);
    const ovalMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 100; i++) {
        const ovalMesh = new THREE.Mesh(ovalGeometry, ovalMaterial);
        const x = Math.random() * 1600 - 800;
        const z = Math.random() * 1600 - 800;

        ovalMesh.position.set(x, 120, z); // Posición a 250 metros de altura
        ovalMesh.scale.set(5, 1, 1.5); // Escala para formar un óvalo en 3D

        ovalMesh.updateMatrix();
        ovalMesh.matrixAutoUpdate = false;

        scene.add(ovalMesh);
    }

    // lights

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
    dirLight2.position.set(- 1, - 1, - 1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    //

    window.addEventListener('resize', onWindowResize);

}
//ajusta el escenario segun el tamano de la pantalla
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();

}

function render() {

    renderer.render(scene, camera);

}
