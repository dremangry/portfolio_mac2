import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { Color } from "three";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.theme = this.experience.theme;

    this.horizontalLerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    }

    this.verticalLerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    }

    this.setModel();
    this.onMouseMove();
  }
  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
      if (child.name === "Monitors") {
        child.children[2].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }
      // hiding the mini floor
      if (child.name === "Floor") {
        child.position.x = -0.289521;
        child.position.z = 8.83572;
      }

      // if (
      //   child.name === "Backpack" ||
      //   child.name === "Sox" ||
      //   child.name === "cube1" ||
      //   child.name === "cube2" ||
      //   child.name === "cube3"
      // ) {
      //   child.scale.set(0, 0, 0);
      // }
      child.scale.set(0, 0, 0);
      if (child.name === "cube") {
        //the cube is renter in Preloader.js
        child.position.set(0, 2, 0);
        child.rotation.y = Math.PI / 4;
      }
      this.roomChildren[child.name.toLowerCase()] = child;
    });

    // the light of the lamp
    const width = 0.4;
    const height = 0.4;
    const intensity = 7;
    const color = '#F39C12'

    const rectLight = new THREE.RectAreaLight(color, intensity, width, height,);
    rectLight.position.set(-1.3243, 11.9, -1.9);  // X, Z, Y
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 2;

    this.actualRoom.add(rectLight)

    this.roomChildren["rectLight"] = rectLight;

    const rectLightHelper = new RectAreaLightHelper(rectLight);
    rectLight.add(rectLightHelper);

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  // control the rotation of the room based on the camera
  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.horizontalLerp.target = this.rotation * 0.1; // rotation of the room

      this.rotationTwo =
        ((e.clientY - window.innerHeight / 2) * 2) / window.innerHeight;
      this.verticalLerp.target = this.rotationTwo * 0.1; // rotation of the room
    });
  }


  resize() {

  }
  //update in real time all the function
  update() {
    this.horizontalLerp.current = GSAP.utils.interpolate(
      this.horizontalLerp.current,
      this.horizontalLerp.target,
      this.horizontalLerp.ease
    );
    this.verticalLerp.current = GSAP.utils.interpolate(
      this.verticalLerp.current,
      this.verticalLerp.target,
      this.verticalLerp.ease
    );
    this.actualRoom.rotation.y = this.horizontalLerp.current; // move from left to right thanks to onMouseMove()

    this.actualRoom.rotation.x = this.verticalLerp.current;
  }
}