import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
// import convert from "./Utils/covertDivsToSpans.js";


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
    // convert(document.querySelector(".intro-text"));
    // convert(document.querySelector(".hero-main-title"));
    // convert(document.querySelector(".hero-main-description"));
    // convert(document.querySelector(".hero-second-subheading"));
    // convert(document.querySelector(".second-sub"));

    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log('######',this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
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
            onComplete: resolve,
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
            onComplete: resolve,
          })
      }
    })
  }
  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      this.secondTimeline.to(this.room.position, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power1.out",
      },
      'same').to(this.roomChildren.cube.rotation, {
        y: 2*Math.PI + Math.PI/4
      },
      'same').to(this.roomChildren.cube.scale, {
        x: 10,
        y: 10,
        z: 10,
      },
      'same').to(this.camera.orthographicCamera.position, {
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
      })
      // room items
      .to(this.roomChildren.shelf.scale, { //shelf
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      })
      .to(this.roomChildren.table.scale, { //table
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      })
      .to(this.roomChildren.stand.scale, { //stand
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, 'same1')
      .to(this.roomChildren.plant.scale, { //plant
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      },'same1')
      .to(this.roomChildren.electronic.scale, { //electronic
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      },'same2')
      .to(this.roomChildren.monitors.scale, { //monitors
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      },'same2')
      .to(this.roomChildren.carpet.scale, { //carpet
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, 'same3')
      .to(this.roomChildren.chair.scale, { //chair
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, 'same3')
      .to(this.roomChildren.garbage.scale, { //garbage
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, 'same3')
      .to(this.roomChildren.drawer_lamp.scale, { //lamp and drawer
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      })
      .to(this.roomChildren.bed.scale, { //lamp and drawer
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, 'same4')
      .to(this.roomChildren.mirror.scale, { //lamp and drawer
        x: 1,
        y: 1,
        z: 1,
        ease: "back.out(2.2)",
        duration: 0.4,
      }, 'same4')
    })
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      console.log('event');
      window.removeEventListener("wheel", this.scrollOnceEvent);
      // this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  async playIntro() {
    await this.firstIntro();
    this.scrollOnceEvent = this.onScroll.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
  }

  async playSecondIntro() {
    // this.moveFlag = false;
    await this.secondIntro();
    // this.scaleFlag = false;
    // this.emit("enablecontrols");
  }
}