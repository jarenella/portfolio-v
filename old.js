import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene(); //animation holder
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) //anim camera functionParamsAre(FOV, aspectRatio, viewFrustrum)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

//uncomment for dev
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 10;
camera.position.y = 3;
camera.position.z = 10;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

let hat = {};
const hatLoader = new GLTFLoader();
const hatNormalTexture = new THREE.TextureLoader().load('https://t4.ftcdn.net/jpg/02/83/02/71/360_F_283027187_8d757thoI4wXMha5qSnfLxT0Ggv5mzcl.jpg')
hatLoader.load('./meshes/test.glb', 
  (gltf) => {
    hat = gltf.scene;
    scene.add(hat);
    hat.position.y = -3;
  }, 
  undefined, 
  (error) => {
    console.error(error);
  }
)










function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xB487FF, transparent: true, opacity: 0.5});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);









// const ringGeometry = new THREE.TorusGeometry(10, 0.1, 16, 15);
// const ringMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff, transparent: true, opacity: 0.1} );
// const ring = new THREE.Mesh(ringGeometry, ringMaterial);
// const secRingGeometry = new THREE.TorusGeometry(11, 0.1, 16, 15);
// const secRing = new THREE.Mesh(secRingGeometry, ringMaterial);
// scene.add(ring, secRing);
// ring.rotation.y = 45;
// ring.rotation.x = 45.5;
// secRing.rotation.y = 7;
// secRing.rotation.x = 4.6;









// const planetGeometry = new THREE.SphereGeometry(1,100,100,100);
// const planetMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff})
// const planet = new THREE.Mesh(planetGeometry, planetMaterial);
// scene.add(planet);
// planet.position.y = 5;
// planet.position.z = 8.5;










//uncomment for dev
const controls = new OrbitControls(camera, renderer.domElement);

//----------------------------------------------------------------------------------------------------

function animate() {
  requestAnimationFrame(animate);

  hat.rotation.y += 0.01;

  camera.rotation.y += 0.025;

  //uncomment for dev
  controls.update();

  renderer.render(scene, camera);
}
animate();