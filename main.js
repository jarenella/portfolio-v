import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene(); //animation holder
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) //anim camera functionParamsAre(FOV, aspectRatio, viewFrustrum)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 10;
camera.position.y = 3;
camera.position.z = 8;
camera.rotation.y = 1.2;

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//uncomment for dev
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

//uncomment for dev
// const controls = new OrbitControls(camera, renderer.domElement);

let hat = {};
const hatLoader = new GLTFLoader();
const hatNormalTexture = new THREE.TextureLoader().load('https://t4.ftcdn.net/jpg/02/83/02/71/360_F_283027187_8d757thoI4wXMha5qSnfLxT0Ggv5mzcl.jpg')
hatLoader.load('./meshes/test.glb', 
  (gltf) => {
    hat = gltf.scene;
    scene.add(hat);
    hat.rotation.y = -1;
    hat.position.x = 3;
  }, 
  undefined, 
  (error) => {
    console.error(error);
  }
)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25);
    const material = new THREE.MeshStandardMaterial({color: 0xB487FF});
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);














// -------------------------------------------------------------------------------------------------



function moveCamera() {
    console.log("starting everything")
    const currntLoction = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
    console.log("finished moon rotation")

    camera.position.z = currntLoction * -0.09;
    camera.position.x = currntLoction * -0.008;
    camera.position.y = currntLoction * -0.008;
    camera.rotation.y += 0.025;
    console.log("finished camera movement")
}
// document.body.onscroll = moveCamera
window.addEventListener("scroll", moveCamera);

function animate() {
    requestAnimationFrame(animate);

    //uncomment for dev
    // controls.update();

    renderer.render(scene, camera);
}

animate();