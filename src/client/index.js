// @ts-check

import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
  Clock,
  PlaneGeometry,
  MeshBasicMaterial,
  TextureLoader,
  Math as ThreeMath,
  DoubleSide,
} from 'three';
import $ from './libraries/jquery';
import 'bootstrap/dist/js/bootstrap'; // eslint-disable-line import/first
import OrbitControls from './three/OrbitControls';
import PlaceAreaGeometry from './three/PlaceAreaGeometry';
import constants from '../constants';
import Avatar from './three/Avatar';
import getVector2 from './utils/getVector2';
import getVector3 from './utils/getVector3';
import Paths from './utils/Paths';
import getQuery from './utils/getQuery';

// eslint-disable-next-line no-unused-vars
import Path from './utils/Path';

/* eslint-disable no-use-before-define */

const query = getQuery(window.location.search);

const scene = new Scene();
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas')); // eslint-disable-line prettier/prettier

const renderer = new WebGLRenderer({ canvas });
const camera = new PerspectiveCamera();
const controls = new OrbitControls(camera, renderer.domElement);
const clock = new Clock();

const textureLoader = new TextureLoader();
textureLoader.crossOrigin = 'anonymous';

const avatar = new Avatar(
  constants.avatar.body,
  Object.assign({}, constants.avatar.head, {
    texture: textureLoader.load(constants.avatar.head.texture),
  }),
);

const configPaths = new Paths(constants.paths);

let playing = false;
let speed = 0;
let currentRatio = 0;

/** @type {string} */
let view;

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
const $controlView = $('#control-view');

/** @type {Path} */
let currentPath;

init();
animate();

function init() {
  addFloorPlan();

  avatar.position.copy(getVector3(constants.avatar.position));
  avatar.rotation.y = Math.PI;
  scene.add(avatar);

  constants.places.forEach(data => {
    if (data.region) {
      // eslint-disable-next-line prettier/prettier
      const geometry = new PlaceAreaGeometry(/** @type {(typeof data) & { region: any}} */ (data));
      const place = new Mesh(
        geometry,
        new MeshBasicMaterial({
          color: Math.random() * 0xffffff,
          side: DoubleSide,
          transparent: true,
          opacity: 0.5,
        }),
      );
      place.rotation.x = Math.PI / -2;
      scene.add(place);
    }
  });

  camera.position.copy(getVector3(constants.camera.god.position));
  controls.target.copy(avatar.position);

  renderer.setClearColor(0x888888);

  $controlPlay.click(onControlPlayClick);
  $controlPause.click(onControlPauseClick);
  $controlStop.click(onControlStopClick);
  $controlProgress.on('change input', onControlProgressChanged);

  $controlSpeed.change(onControlSpeedChanged);
  onControlSpeedChanged();

  $controlFrom.change(onControlFromChanged);
  $controlTo.change(onControlToChanged);

  Object.keys(configPaths.map).sort().forEach(fromId => {
    const $option = $(`<option value="${fromId}">${fromId}</option>`);

    if (query.from === fromId) {
      $option.prop('selected', true);
    }

    $controlFrom.append($option);
  });

  $controlFrom.change();

  $controlView.change(onControlViewChanged);
  onControlViewChanged();

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
  updateView();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function addFloorPlan() {
  const size = getVector2(constants.floorPlan.size);
  const origin = getVector2(constants.floorPlan.origin);
  const floorPlan = new Mesh(
    new PlaneGeometry(size.x, size.y).translate(
      size.x / +2 - origin.x,
      size.y / -2 + origin.y,
      0,
    ),
    new MeshBasicMaterial({
      map: textureLoader.load('./resources/floor-plan.png'),
      polygonOffset: true,
      polygonOffsetFactor: 1.0,
      polygonOffsetUnits: 4.0,
    }),
  );
  floorPlan.rotation.x = Math.PI / -2;
  scene.add(floorPlan);
}

/**
 * @param {number} ratio 0.0 ~ 1.0
 */
function moveAvatar(ratio) {
  currentRatio = ThreeMath.clamp(ratio, 0, 1);
  $controlProgress.val(currentRatio);

  const newPosition = currentPath.getPoint(currentRatio);

  if (!newPosition.equals(avatar.position)) {
    avatar.lookAt(newPosition);
    avatar.position.copy(newPosition);
  }
}

/**
 * @param {number} delta second
 */
function updateAvatar(delta) {
  const deltaDistance = speed * constants.speed * delta;
  const deltaRatio = deltaDistance / currentPath.distance;

  const newRatio = currentRatio + deltaRatio;
  moveAvatar(newRatio);
}

function updateView() {
  if (view === 'god') {
    controls.update();
  } else {
    camera.position.copy(
      avatar.localToWorld(getVector3(constants.camera['3rd'].position)),
    );
    camera.lookAt(avatar.position);
  }
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

function onControlViewChanged() {
  const viewId = getViewId();
  switch (viewId) {
    case 'god':
    case '3rd':
      view = viewId;
      break;
    default:
      throw new Error(`Unexpected viewId '${viewId}'`);
  }
}

function getViewId() {
  return /** @type {string} */ ($controlView.val()); // eslint-disable-line prettier/prettier
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
