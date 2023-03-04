// const THREE = require('three');
// const OrbitControls = require('three/examples/jsm/controls/OrbitControls');
// const GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader');

// const { Clock } = require("three");

// console.log(THREE.REVISION);
// import {OrbitControls} from "./three"

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    500
);
var renderer = new THREE.WebGLRenderer({
    antialias: true
});

cam.position.z = 10;
cam.position.y += 5;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x888888);

// let geo = new THREE.BoxGeometry(2,2,2);
// let texture = new THREE.TextureLoader().load("tex/ww.png");
// let mat = new THREE.MeshStandardMaterial({
//     roughness:10
// });
// let mesh = new THREE.Mesh(geo, mat);
// mesh.castShadow = true;
// mesh.receiveShadow = true;
// scene.add(mesh);
// scene.add(new THREE.BoxHelper(mesh, 0x000000));

let pgeo = new THREE.PlaneGeometry(10,10,100,100);
let pmat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});
// pmat.map = texture;
let pmesh = new THREE.Mesh(pgeo, pmat);
pmesh.rotation.x = Math.PI /2;
pmesh.position.set(0, -0  ,0);
pmesh.receiveShadow = true;
scene.add(pmesh);

let bedug;
let animation;
let mixer;

let loader = new THREE.GLTFLoader().load("model/drum.gltf", function(result) {
    console.log(result);
    animation = result.animations;
    mixer = new THREE.AnimationMixer(result.scene);
    let action1 = mixer.clipAction(animation[0]);
    action1.play();
    let action2 = mixer.clipAction(animation[1]);
    action2.play();
    let action3 = mixer.clipAction(animation[2]);
    action3.play();

    
    bedug = [
        result.scene.children[0],
        result.scene.children[1],
        result.scene.children[2]
    ]
    scene.add(bedug[0]);
    scene.add(bedug[1]);
    scene.add(bedug[2]);
    bedug[0].castShadow = true
    bedug[1].castShadow = true
    bedug[2].castShadow = true;


})

let ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

let plight = new THREE.PointLight(0xffffff, 0.7);
plight.position.set(1,4,1);
plight.castShadow = true;
scene.add(plight);
scene.add(new THREE.PointLightHelper(plight, 0.2, 0xffffff));

let plight2 = new THREE.PointLight(0xffffff, 0.7);
plight2.position.set(-1,4,1);
plight2.castShadow = true;
scene.add(plight2);
scene.add(new THREE.PointLightHelper(plight2, 0.2, 0xffffff));

let plight1 = new THREE.PointLight(0xffffff, 0.7);
plight1.position.set(-1,1,-1);
plight1.castShadow = true;
scene.add(plight1);
scene.add(new THREE.PointLightHelper(plight1, 0.2, 0xffffff));

let plight3 = new THREE.PointLight(0xffffff, 0.7);
plight3.position.set(-1,1,-1);
plight3.castShadow = true;
scene.add(plight3);
scene.add(new THREE.PointLightHelper(plight3, 0.2, 0xffffff));

var controls = new THREE.OrbitControls(cam, renderer.domElement);
let clock = new THREE.Clock();

function update(){
    if (mixer) {
        mixer.update(clock.getDelta());
    }
    renderer.render(scene, cam);
    requestAnimationFrame(update);
}
update();

