const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const mesh = new THREE.Mesh(geometry, material);

const starsGeometry = new THREE.SphereGeometry(4, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial();
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);

const light = new THREE.DirectionalLight(0xcccccc, 1);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 3;
light.position.set(5, 3, 5);

material.map = new THREE.TextureLoader().load('textures/diffuse.jpg');
material.bumpMap = new THREE.TextureLoader().load('textures/bump.jpg');     
material.bumpScale = 0.015;

starsMaterial.map = new THREE.TextureLoader().load('textures/stars.jpg');
starsMaterial.side = THREE.BackSide;

scene.add(mesh);
scene.add(light);
scene.add(starsMesh);

document.addEventListener('mousemove', (e) => {
    camera.position.x = (e.x - (window.innerWidth / 2)) * 0.005;
    camera.lookAt(scene.position);
});

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    mesh.rotation.y -= 0.001;
};

animate();