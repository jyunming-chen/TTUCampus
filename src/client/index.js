// @ts-check

import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
  Clock,
  Math as ThreeMath,
} from 'three';
import $ from './utils/jquery';
import 'bootstrap/dist/js/bootstrap'; // eslint-disable-line import/first
import OrbitControls from './three/OrbitControls';
import PlaceAreaGeometry from './three/PlaceAreaGeometry';
import constants from '../constants';
import AvatarGeometry from './three/AvatarGeometry';
import getConfigVector3 from './utils/getConfigVector3';
import getConfigPaths from './utils/getConfigPaths';

// eslint-disable-next-line no-unused-vars
import ConfigPath from './utils/ConfigPath';

/* eslint-disable no-use-before-define */

const scene = new Scene();
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas')); // eslint-disable-line prettier/prettier

const renderer = new WebGLRenderer({ canvas });
const camera = new PerspectiveCamera();
const controls = new OrbitControls(camera, renderer.domElement);
const clock = new Clock();

const avatar = new Mesh(new AvatarGeometry());
const configPaths = getConfigPaths();

let playing = false;
let speed = 0;
let currentRatio = 0;

let isSideControls = true;
const $controls = $('#controls');
const $sideControls = $('#side-controls');
const $navbarControls = $('#navbar-controls');

const $controlFrom = $('#control-from');
const $controlTo = $('#control-to');

const $controlProgress = $('#control-progress');
const $controlPlay = $('#control-play');
const $controlPause = $('#control-pause');
const $controlStop = $('#control-stop');
const $controlSpeed = $('#control-speed');

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

  $($controlPlay).click(onControlPlayClick);
  $($controlPause).click(onControlPauseClick);
  $($controlStop).click(onControlStopClick);
  $($controlProgress).on('change input', onControlProgressChanged);

  $($controlSpeed).change(onControlSpeedChanged);
  onControlSpeedChanged();

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
  const delta = clock.getDelta();

  if (playing) {
    updateAvatar(delta);
    if (currentRatio === 1) {
      playing = false;
    }
  }

  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

/**
 * @param {number} ratio 0.0 ~ 1.0
 */
function moveAvatar(ratio) {
  currentRatio = ThreeMath.clamp(ratio, 0, 1);
  $controlProgress.val(currentRatio);
  avatar.position.copy(currentPath.getPoint(currentRatio));
}

/**
 * @param {number} delta second
 */
function updateAvatar(delta) {
  const deltaDistance = speed * constants.speed * constants.scale * delta;
  const deltaRatio = deltaDistance / currentPath.distance;

  const newRatio = currentRatio + deltaRatio;
  moveAvatar(newRatio);
}

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
    onControlStopClick();
  }
}

function onControlProgressChanged() {
  moveAvatar(getProgressValue());
}

function onControlPlayClick() {
  playing = true;
}

function onControlPauseClick() {
  playing = false;
}

function onControlStopClick() {
  onControlPauseClick();
  moveAvatar(0);
}

function onControlSpeedChanged() {
  speed = getSpeedValue();
}

function getFromId() {
  return /** @type {string} */ ($controlFrom.val()); // eslint-disable-line prettier/prettier
}

function getToId() {
  return /** @type {string} */ ($controlTo.val()); // eslint-disable-line prettier/prettier
}

function getSpeedValue() {
  return Number($controlSpeed.val());
}

function getProgressValue() {
  return Number($controlProgress.val());
}
