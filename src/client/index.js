// @ts-check

import { Scene, WebGLRenderer, PerspectiveCamera, Mesh } from 'three';
import $ from './utils/jquery';
import 'bootstrap/dist/js/bootstrap'; // eslint-disable-line import/first
import OrbitControls from './three/OrbitControls';
import PlaceAreaGeometry from './three/PlaceAreaGeometry';
import constants from '../constants';
import AvatarGeometry from './three/AvatarGeometry';
import getConfigVector3 from './utils/getConfigVector3';

/* eslint-disable no-use-before-define */

const scene = new Scene();

/** @type {any} HTMLCanvasElement */
const canvas = document.getElementById('canvas');

const renderer = new WebGLRenderer({ canvas });
const camera = new PerspectiveCamera();
const controls = new OrbitControls(camera, renderer.domElement);

init();
animate();

function init() {
  const avatar = new Mesh(new AvatarGeometry());
  avatar.position.copy(getConfigVector3(constants.avatar.position));
  scene.add(avatar);

  constants.places.forEach(data => {
    if (data.region) {
      const geometry = new PlaceAreaGeometry(data);
      const place = new Mesh(geometry);
      place.rotation.x = Math.PI / -2;
      scene.add(place);
    }
  });

  camera.position.copy(getConfigVector3(constants.camera.position));
  controls.target.copy(avatar.position);

  renderer.setClearColor(0x888888);

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
