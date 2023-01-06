import { formatNumber } from "./format-number";

export default class Result {
  constructor(element) {
    this.counter = element;

    this.root = element.querySelector(`.counter__result`);
    this.caloriesNormOutput = this.root.querySelector(`#calories-norm`);
    this.caloriesMinOutput = this.root.querySelector(`#calories-minimal`);
    this.caloriesMaxOutput = this.root.querySelector(`#calories-maximal`);
  }

  show(calories) {
    // показ блока с результатом

    this.caloriesNormOutput.textContent = formatNumber(calories.norm);
    this.caloriesMinOutput.textContent = formatNumber(calories.minimal);
    this.caloriesMaxOutput.textContent = formatNumber(calories.maximal);

    this.root.classList.remove("counter__result--hidden");
  }

  hide() {
    // скрытие блока, очистка значений
    this.root.classList.add("counter__result--hidden");

    this.caloriesNormOutput.textContent = 0;
    this.caloriesMinOutput.textContent = 0;
    this.caloriesMaxOutput.textContent = 0;
  }
}
