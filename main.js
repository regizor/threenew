import * as THREE from 'three';
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true }); // { alpha: true } for transparent background, if needed
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// GSAP Animation tied to scroll
gsap.to(cube.rotation, {
  scrollTrigger: {
    trigger: "#large",
    start: "top top",
    end: "bottom bottom",
    scrub: true, // Smooth scrubbing, consider a number for more controlled scrubbing speed
  },
  y: Math.PI * 2, // Full rotation
  x: Math.PI * 2, // Full rotation
  ease: "none"
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
