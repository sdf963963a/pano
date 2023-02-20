<template>
  <div>
    <div class="container" ref="container2"></div>
  </div>
  
</template>
  
  <script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { ref, onMounted } from "vue";

// 初始化场景
const scene = new THREE.Scene();
// 初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const container2 = ref(null);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

const geometry = new THREE.SphereGeometry(5, 32, 32);
    const texture = new THREE.TextureLoader().load(
    `./img/test2.webp`
    );
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    cube.geometry.scale(1, 1, -1);
    scene.add(cube);
    camera.position.set(0, 0, 0.01);

// 信息点
let hotPoints = [
  {
    position: {
        x: 0,
        y: 0,
        z: -0.2,
    },
    detail: {
      title: "信息点1",
    },
  },
  {
    position: {
      x: -0.2,
      y: -0.05,
      z: 0.2,
    },
    detail: {
      title: "信息点2",
    },
  },
];

// 热点
let pointTexture = new THREE.TextureLoader().load(
  `./img/pig.png`
);
let material2 = new THREE.SpriteMaterial({ map: pointTexture });
var poiObjects = [];
for (var i = 0; i < hotPoints.length; i++) {
  var sprite = new THREE.Sprite(material2);
  sprite.scale.set(0.02, 0.02, 0.02);
  sprite.position.set(
    hotPoints[i].position.x,
    hotPoints[i].position.y,
    hotPoints[i].position.z
  );
  scene.add(sprite);
  sprite.detail = hotPoints[i].detail;
  poiObjects.push(sprite);
}

// 点击-发射射线
window.addEventListener("click", function (event) {
  event.preventDefault();

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  mouse.x = (event.clientX / document.body.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / document.body.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(poiObjects);
  if (intersects.length > 0) {
    alert("点击了" + intersects[0].object.detail.title);
  }
});

// 挂载完毕之后
onMounted(() => {
  // 添加控制器
  const controls = new OrbitControls(camera, container2.value);
  controls.enableDamping = true;
  container2.value.appendChild(renderer.domElement);
  render();
});
</script>
  
  <style>
* {
  padding: 0;
  margin: 0;
}
</style>