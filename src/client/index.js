import { Scene, WebGLRenderer, GridHelper, PerspectiveCamera } from 'three';
import './utils/jquery-global';
import 'bootstrap/dist/js/bootstrap';
import OrbitControls from './utils/OrbitControls';

const $ = jQuery;

/* eslint-disable no-use-before-define */

const scene = new Scene();
const canvas = document.getElementById('canvas');
const renderer = new WebGLRenderer({ canvas });
const camera = new PerspectiveCamera();
const controls = new OrbitControls(camera, renderer.domElement);

init();
animate();

function init() {
  camera.position.set(0, 200, 100);
  renderer.setClearColor(0x888888);

  const gridXZ = new GridHelper(100, 20, 0xff0000, 0xffffff);
  scene.add(gridXZ);

  $(onWindowResize);
  $(window).resize(onWindowResize);
}

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

let isSideControls = true;
const $controls = $('#controls');
const $sideControls = $('#side-controls');
const $navbarControls = $('#navbar-controls');

function onWindowResize() {
  const $parent = $(canvas).parent();
  const width = $parent.innerWidth();
  const height = $parent.innerHeight();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  if (window.innerWidth < 768) {
    if (isSideControls) {
      isSideControls = false;
      $navbarControls.append($controls.detach());
    }
  } else if (!isSideControls) {
    isSideControls = true;
    $sideControls.append($controls.detach());
  }
}
