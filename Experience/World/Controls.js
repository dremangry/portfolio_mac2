import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

//control the path of the camera (the curve)
export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    GSAP.registerPlugin(ScrollTrigger);

    this.setPath();
  }
  setPath() {
    this.timeline = new GSAP.timeline();
    this.timeline.to(this.room.position, {
      x: 5,
      duration: 20,
    })
  }

  resize() {}

  update() {

  }
}