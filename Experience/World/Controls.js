import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import ASScroll from "@ashthornton/asscroll";


//control the path of the camera (the curve) and the movement of the room
export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }
  // movement of the room
  setScrollTrigger() {
    ScrollTrigger.matchMedia({

      // desktop
      "(min-width: 969px)": () => {
        //reset
        this.room.scale.set(0.11, 0.11, 0.11);
        this.rectLight.width = 0.4;
        this.rectLight.height = 0.4;
        this.camera.orthographicCamera.position.set(0, 6.5, 10);
        this.room.position.set(0, 0, 0);
        // First part -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move", //start at the html class
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            // markers: true, to see where it start and end
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.fromTo(
          this.room.position,
          { x: 0, y: 0, z: 0 },
          {
            x: () => {
              return this.sizes.width * 0.0014;
            },
          }
        );

        // Second part -----------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move", //start at the html class
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to( // move the position of the room
            this.room.position,
            {
              x: () => {
                return 1;
              },
              // y: () => {
              //   return -0.5;
              // },
              z: () => {
                return this.sizes.height * 0.0032;
              },
            },
            "same"
          )
          .to( //scale of the room
            this.room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            "same"
          )
          .to( //scale the light (to work on )
            this.rectLight,
            {
              width: 0.4 * 2,
              height: 0.4 * 2,
              intensity: 7 * 2,
            },
            "same"
          );

        // Third part -----------------------------------------
        // the position of the camera (to change)
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.camera.orthographicCamera.position, {
          y: 0.5,
          x: -4.1,
        });
      },

      // mobile
      "(max-width: 968px)": () => {
        // Resets
        this.room.scale.set(0.07, 0.07, 0.07);
        this.room.position.set(0, 0, 0);
        this.rectLight.width = 0.3;
        this.rectLight.height = 0.4;
        this.camera.orthographicCamera.position.set(0, 6.5, 10);

        // First part -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            // invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        });

        // Second part -----------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            "same"
          )
          .to(
            this.rectLight,
            {
              width: 0.3 * 3.4,
              height: 0.4 * 3.4,
            },
            "same"
          )
          .to(
            this.room.position,
            {
              x: 1.5,
            },
            "same"
          );

        // Third part -----------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.room.position, {
          z: -4.5,
        });
      },
      // all
      "all": () => {
        // mini platform animation
        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "center center",
          },
        });

        this.room.children.forEach((child) => {
          if (child.name === "Mini_Floor") {
            this.first = GSAP.to(child.position, {
              x: -5.44055,
              z: 13.6135,
              duration: 0.3,
            });
          }
        });
      }

    });
  }

  resize() {}

  update() {

  }
}