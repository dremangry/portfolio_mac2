import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    // this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    // console.log(this.actualRoom);

    this.lerp = {
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
          // console.log(groupchild.material);
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
      // console.log('!!!!!!!!',child);
      if (child.name === "monitor_image") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

    });

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  // control the rotation of the room based on the camera
  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      console.log(e);
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      // this.lerp.target = this.rotation * 0.05;
      this.lerp.target = this.rotation * 0.1;
    });
  }


  resize() {

  }
  //update in real time all the function
  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current; // move from left to right thanks to onMouseMove()
    // this.actualRoom.rotation.x = this.lerp.current;
  }
}