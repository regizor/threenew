import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1); // Adjust direction as needed
scene.add(directionalLight);


// Create a GLTFLoader to load the .glb file
let modelCrema;

const loader = new GLTFLoader();
loader.load(
  'https://spectacular-cupcake-7ecc17.netlify.app/models/cream.glb', // Path to your GLB model, relative to the public directory
  function (gltf) {
    modelCrema = gltf.scene;
    scene.add(modelCrema);
    console.log("Model loaded!");
    animateModel();
  },
  undefined, // You can define a function for progress updates here
  function (error) {
    console.error('An error happened while loading the model:', error);
  }
);


camera.position.z = 5;

function animateModel() {
  // Ensure the model is defined
  if (!modelCrema) return;

  // GSAP animation to rotate the model
  gsap.to(modelCrema.rotation, {
    duration: 5, // Duration of the animation in seconds
    y: Math.PI * 2, // Rotate the model 360 degrees around the Y axis
    repeat: -1, // Repeat the animation indefinitely
    ease: "none" // Use a linear ease for constant rotation speed
  });
}



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
