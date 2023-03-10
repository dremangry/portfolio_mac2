import { EventEmitter } from "events";

// takes care of the dark and light mode
export default class Theme extends EventEmitter {
  constructor() {
    super();

    this.theme = "light";

    this.toggleButton = document.querySelector(".toggle-button");
    this.toggleCircle = document.querySelector(".toggle-circle");

    this.setEventListeners();
  }

  setEventListeners() {
    this.toggleButton.addEventListener("click", () => {
      this.toggleCircle.classList.toggle("slide");
      this.theme = this.theme === "light" ? "dark" : "light";
      document.body.classList.toggle("dark-theme"); // changing the class of the body
      document.body.classList.toggle("light-theme");
      // console.log(this.theme);

      this.emit("switch", this.theme);
    });
  }
}
