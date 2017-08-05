// @ts-check

import { Scene, WebGLRenderer, PerspectiveCamera, Mesh } from 'three';
import $ from './utils/jquery';
import 'bootstrap/dist/js/bootstrap'; // eslint-disable-line import/first
import OrbitControls from './three/OrbitControls';
import PlaceAreaGeometry from './three/PlaceAreaGeometry';
import constants from '../constants';
import AvatarGeometry from './three/AvatarGeometry';
import getConfigVector3 from './utils/getConfigVector3';
import getConfigPaths from './utils/getConfigPaths';
import ConfigPath from './utils/ConfigPath';

/* eslint-disable no-use-before-define */

const scene = new Scene();
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas')); // eslint-disable-line prettier/prettier

const renderer = new WebGLRenderer({ canvas });
const camera = new PerspectiveCamera();
const controls = new OrbitControls(camera, renderer.domElement);

const avatar = new Mesh(new AvatarGeometry());

const configPaths = getConfigPaths();

const $controlFrom = $('#control-from');
const $controlTo = $('#control-to');

/** @type {ConfigPath} */
let currentPath;

init();
animate();

function init() {
  avatar.position.copy(getConfigVector3(constants.avatar.position));
  scene.add(avatar);

  constants.places.forEach(data => {
    if (data.region) {
      // eslint-disable-next-line prettier/prettier
      const geometry = new PlaceAreaGeometry(/** @type {(typeof data) & { region: any}} */ (data));
      const place = new Mesh(geometry);
      place.rotation.x = Math.PI / -2;
      scene.add(place);
    }
  });

  camera.position.copy(getConfigVector3(constants.camera.position));
  controls.target.copy(avatar.position);

  renderer.setClearColor(0x888888);

  $($controlFrom).change(onControlFromChanged);
  $($controlTo).change(onControlToChanged);

  Object.keys(configPaths.map).forEach(fromId => {
    $controlFrom.append(`<option value="${fromId}">${fromId}</option>`);
  });
  $controlFrom.change();

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
  const width = /** @type {number} */ ($parent.innerWidth()); // eslint-disable-line prettier/prettier
  const height = /** @type {number} */ ($parent.innerHeight()); // eslint-disable-line prettier/prettier
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

function onControlFromChanged() {
  $controlTo.empty();
  Object.keys(configPaths.map[getFromId()]).forEach(toId => {
    $controlTo.append(`<option value="${toId}">${toId}</option>`);
  });
  $controlTo.change();
}

function onControlToChanged() {
  const path = configPaths.getPath(getFromId(), getToId());
  if (path) {
    currentPath = path;
    avatar.position.copy(path.points[0]);
  }
}

function getFromId() {
  return /** @type {string} */ ($controlFrom.val()); // eslint-disable-line prettier/prettier
}

function getToId() {
  return /** @type {string} */ ($controlTo.val()); // eslint-disable-line prettier/prettier
}
