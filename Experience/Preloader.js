import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/CoverContainers.js";


export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device; //initial state

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".dev-main-title"));
    convert(document.querySelector(".dev-main-description"));
    convert(document.querySelector(".dev-second-subheading"));
    convert(document.querySelector(".second-sub"));

    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log('######',this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document
            .querySelector(".preloader")
            .classList.add("hidden");
        },
      });
      if (this.device === 'desktop') {
        this.timeline.to(this.roomChildren.cube.scale, {
          x: 1.4,
          y: 1.4,
          z: 1.4,
          ease: "back.out(2.5)",
          duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
            // onComplete: resolve,
          })
      } else {
          this.timeline.to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          })
        }
        this.timeline.to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        })
        .to(".arrow-svg-wrapper", {
          opacity: 1,
        }, 'same')
        .to(".toggle-bar", {
          opacity: 1,
          onComplete: resolve,
        }, 'same');
    })
  }
  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      this.secondTimeline.to(".intro-text .animatedis", {
        yPercent: 100,
        stagger: 0.04,
        ease: "back.in(1.7)",
      }, 'fadeout')
      .to(".arrow-svg-wrapper", {
          opacity: 0,
      },'fadeout')
      .to(this.room.position, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power1.out",
      },
      'same')
      .to(this.roomChildren.cube.rotation, {
        y: 2*Math.PI + Math.PI/4
      },
      'same')
      .to(this.roomChildren.cube.scale, {
        x: 10,
        y: 10,
        z: 10,
      },
      'same')
      .to(this.camera.orthographicCamera.position, {
        y: 6.5,
      },
      'same')
      .to(this.roomChildren.cube.position, {
        x: 0.107446,
        y: 11.233,
        z: 3.4891
      },
      'same')
      .set(this.roomChildren.wall.scale, {
        x: 1,
        y: 1,
        z: 1,
      }, 'base')
        .set(this.roomChildren.floor.scale, {
        x: 1,
        y: 1,
        z: 1,
      }, 'base')
      .to(this.roomChildren.cube.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
      }, 'intro')
      .to(".dev-main-title .animatedis", {
        yPercent: 0,
        stagger: 0.07,
        ease: "back.out(1.7)",
      }, 'intro')
      .to(".dev-main-description .animatedis", {
        yPercent: 0,
        stagger: 0.07,
        ease: "back.out(1.7)",
      }, 'intro')
      .to(".first-sub .animatedis", {
        yPercent: 0,
        stagger: 0.07,
        ease: "back.out(1.7)",
      }, 'intro')
      .to(".second-sub .animatedis", {
        yPercent: 0,
        stagger: 0.07,
        ease: "back.out(1.7)",
      }, 'intro')
      // room items
      .to(this.roomChildren.shelf.scale, { //shelf
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, ">-0.6")
      .to(this.roomChildren.table.scale, { //table
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, ">-0.5")
      .to(this.roomChildren.stand.scale, { //stand
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, '>-0.4')
      .to(this.roomChildren.plant.scale, { //plant
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      },'>-0.4')
      .to(this.roomChildren.electronic.scale, { //electronic
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      },'>-0.4')
      .to(this.roomChildren.monitors.scale, { //monitors
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      },'>-0.4')
      .to(this.roomChildren.carpet.scale, { //carpet
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, '>-0.3')
      .to(this.roomChildren.chair.scale, { //chair
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, '>-0.3')
      .to(this.roomChildren.garbage.scale, { //garbage
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, '>-0.3')
      .to(this.roomChildren.drawer_lamp.scale, { //lamp and drawer
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, '>-0.3')
      .to(this.roomChildren.bed.scale, { //bed
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, '>-0.2')
      .to(this.roomChildren.mirror.scale, { //mirror
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, '>-0.2')
      .to(".arrow-svg-wrapper", {
        opacity: 1,
        onComplete: resolve,
      },)
    })
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      console.log('event');
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.intialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    this.roomChildren.rectLight.width = 0;
    this.roomChildren.rectLight.height = 0;

    if (this.device === "desktop") {
      this.room.scale.set(0.11, 0.11, 0.11);
    } else {
      this.room.scale.set(0.07, 0.07, 0.07);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }

    if (this.scaleFlag) {
      this.scale();
    }
  }
}