import { validateInput } from "./validate-input";
import Result from "./result.js";

const PhysicalActivityRatio = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9,
};

const CaloriesFormulaFactor = {
  AGE: 5,
  WEIGHT: 10,
  HEIGHT: 6.25,
};

const CaloriesFormulaConstant = {
  MALE: -5,
  FE,
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15,
};

export default class Counter {
  constructor(element) {
    // перечисление параметров, необходимых для работы: gender, age, weight, height, activity и т.д.
    this.root = element;
    this.form = this.root.querySelector(".counter__form");
    this.elements = this.form.elements;
    this.parameters = [...this.elements.parameters.elements];
    this.gender = this.form.elements.gender.value.toUpperCase();
    this.activity = this.form.elements.activity.value.toUpperCase();
    this.age = this.form.elements.age.value;
    this.height = this.form.elements.height.value;
    this.weight = this.form.elements.weight.value;
    this.submitButton = this.form.elements["submit"];
    this.resetButton = this.form.elements["reset"];

    this.result = new Result(this.root);

    //
    this._onFormInput = this._onFormInput.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onFormReset = this._onFormReset.bind(this);
  }

  _onFormInput(event) {
    // получение данных от пользователя
    // также можно добавить небольшую валидацию
    event.preventDefault();
    // console.log("Отпарвка");
    const target = event.target;
    const isValid = target.checkValidity();

    if (target.closest('[name="parameters"]')) {
      target.value = validateInput(target);
      this[target.name] = target.value;
    } else if (target.type == "radio") {
      this[target.name] = target.value.toUpperCase();
    }
    this.submitButton.disabled = !this.form.checkValidity();
    this.resetButton.disabled = !this.elements;
  }

  _onFormReset() {
    // задизабленность при обновлении страницы кнопок, скрытие блока с результатом
    console.log("reset");
    this.submitButton.disabled = true;
    this.resetButton.disabled = true;
    this.result.hide();
    this.deinit();
  }

  _onFormSubmit(event) {
    // вызов методов расчета калорий
    // getCaloriesNorm(), getCaloriesMin(), getCaloriesMax()
    // показ блока с результатами калорий
    event.preventDefault();
    console.log("Sumbit");
    let caloriesNorm = this.getCaloriesNorm();

    const calories = {
      norm: caloriesNorm,
      minimal: this.getCaloriesMin(caloriesNorm),
      maximal: this.getCaloriesMax(caloriesNorm),
    };
    console.log(`norm: ${calories.norm}`);
    console.log(`min: ${calories.minimal}`);
    console.log(`max: ${calories.maximal}`);

    this.result.show(calories);
  }

  init() {
    // инициализация обработчиков событий
    // _onFormInput, _onFormReset, _onFormSubmit
    this.form.addEventListener("input", this._onFormInput);
    this.form.addEventListener("submit", this._onFormSubmit);
    this.form.addEventListener("reset", this._onFormReset);
  }

  getActivityRatio() {
    const activity = this.activity;
    return PhysicalActivityRatio[activity];
  }

  deinit() {
    // удаление обработчиков событий
    // _onFormInput, _onFormReset, _onFormSubmit
    this.elements.outerHTML = this.elements.outerHTML;
    this.gender = "MALE";
    this.activity = "MIN";
    this.age = 0;
    this.height = 0;
    this.weight = 0;
    console.log("deinit");
    console.log(`gender: ${this.gender}`);
    console.log(`age: ${this.age}`);
    console.log(`weight: ${this.weight}`);
    console.log(`height: ${this.height}`);
    console.log(`activity: ${this.activity}`);
  }

  getCaloriesNorm() {
    // перечисление констант age, weight, height, gender, activity
    // применение формулы расчета
    const gender = this.gender;
    const age = Number(this.age);
    const weight = Number(this.weight);
    const height = Number(this.height);
    const activity = this.activity;
    console.log(`gender: ${gender}`);
    console.log(`age: ${age}`);
    console.log(`weight: ${weight}`);
    console.log(`height: ${height}`);
    console.log(`activity: ${activity}`);
    const caloriesNorm =
      CaloriesFormulaFactor.WEIGHT * weight +
      CaloriesFormulaFactor.HEIGHT * height -
      CaloriesFormulaFactor.AGE * age -
      CaloriesFormulaConstant[gender];
    const activityRatio = this.getActivityRatio();

    return Math.round(caloriesNorm * activityRatio);
  }

  getCaloriesMin(caloriesNorm) {
    return Math.round(caloriesNorm * CaloriesMinMaxRatio.MIN);
  }

  getCaloriesMax(caloriesNorm) {
    return Math.round(caloriesNorm * CaloriesMinMaxRatio.MAX);
  }
}
