import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import GUI from "lil-gui";

//takes care of all the lighting

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // for the GUI menu
    // this.gui = new GUI({ container: document.querySelector(".dev-main") });
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 2,
    };

    this.setSunlight();
    // this.setGUI();

  }
  //for the GUI menu
 // for more about lil GUI (https://lil-gui.georgealways.com/)
  setGUI() {
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
      // console.log(this.obj.colorObj); to see rgb value
    });
    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity;
      this.sunLight.ambientLight = this.obj.intensity;
    });
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;

    //see direction of camera and shadow
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);

    this.sunLight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#caf0f8", 1); //light blue
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    console.log(this.sunLight);
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });

    } else { //light theme
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 2,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }

}