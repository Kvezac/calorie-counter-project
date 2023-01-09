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
  FEMALE: 161,
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15,
};
/**
 *  this is class Counter
 */
export default class Counter {
  /**
   * @constructor
   * @param {*} element  object
   * @param {object} root
   * @param {object} form
   * @param {object} elements
   * @param {string} gender
   * @param {string} activity
   * @param {string} age
   * @param {string} height
   * @param {string} weight
   * @param {object} submitButton
   * @param {object} resetButton
   * @param {class} result
   * @param {function} _onFormInput
   * @param {function} _onFormSubmit
   * @param {function} _onFormReset
   *
   */
  constructor(element) {
    // перечисление параметров, необходимых для работы: gender, age, weight, height, activity и т.д.
    this.root = element;
    this.form = this.root.querySelector(".counter__form");
    this.elements = this.form.elements;
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
  /**
   *
   * @param {*} event
   * @param {object} target
   * @module {function} validateInput
   *
   */
  _onFormInput(event) {
    // получение данных от пользователя
    // также можно добавить небольшую валидацию
    event.preventDefault();
    // console.log("Отпарвка");
    const target = event.target;

    if (target.closest('[name="parameters"]')) {
      target.value = validateInput(target);
      this[target.name] = target.value;
      this.resetButton.disabled = target.value ? false : true;
    } else if (target.type == "radio") {
      this[target.name] = target.value.toUpperCase();
    }
    this.submitButton.disabled = !this.form.checkValidity();

    // this.resetButton.disabled = !this.elements;
  }
  /**
   * @private {function} _onFormReset
   */
  _onFormReset() {
    // задизабленность при обновлении страницы кнопок, скрытие блока с результатом
    console.log("reset");
    this.submitButton.disabled = true;
    this.resetButton.disabled = true;
    this.result.hide();
    this.deinit();
  }
  /**
   *@private {function} _onFormSubmit
   * @param {*} event
   * @param {Number} caloriesNorm
   * @param {Array} calories
   */
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
    console.log("***********************");
    this.result.show(calories);
  }
  /**
   * This is init() function start event
   */
  init() {
    // инициализация обработчиков событий
    // _onFormInput, _onFormReset, _onFormSubmit
    this.form.addEventListener("input", this._onFormInput);
    this.form.addEventListener("submit", this._onFormSubmit);
    this.form.addEventListener("reset", this._onFormReset);
  }
  /**
   * @param {Number} activity
   * @returns {Number}
   */
  getActivityRatio() {
    const activity = this.activity;
    return PhysicalActivityRatio[activity];
  }
  /**
   * This is deinit() function reset parameters
   */
  deinit() {
    // удаление обработчиков событий
    // _onFormInput, _onFormReset, _onFormSubmit
    this.elements.outerHTML = this.elements.outerHTML;
    this.gender = "MALE";
    this.activity = "MIN";
    this.age = "0";
    this.height = "0";
    this.weight = "0";
    console.log("deinit");
    console.log(`gender: ${this.gender}`);
    console.log(`age: ${this.age}`);
    console.log(`weight: ${this.weight}`);
    console.log(`height: ${this.height}`);
    console.log(`activity: ${this.activity}`);
    console.log("*************************");
  }
  /**
   * This is function calculate user input.
   * @returns {Number}
   * @param {Number} age
   * @param {Number} weight
   * @param {Number} height
   */
  getCaloriesNorm() {
    // перечисление констант age, weight, height, gender, activity
    // применение формулы расчета
    const gender = this.gender;
    const age = Number.parseInt(this.age, 10);
    const weight = Number.parseInt(this.weight, 10);
    const height = Number.parseInt(this.height, 10);
    const activity = this.activity;
    console.log(`gender: ${gender}`);
    console.log(`age: ${age}`);
    console.log(`weight: ${weight}`);
    console.log(`height: ${height}`);
    console.log(`activity: ${activity}`);
    console.log("**********************");
    const caloriesNorm =
      CaloriesFormulaFactor.WEIGHT * weight +
      CaloriesFormulaFactor.HEIGHT * height -
      CaloriesFormulaFactor.AGE * age -
      CaloriesFormulaConstant[gender];
    const activityRatio = this.getActivityRatio();

    return Math.round(caloriesNorm * activityRatio);
  }
  /**
   *
   * @param {Number} caloriesNorm
   * @returns {Number}
   */
  getCaloriesMin(caloriesNorm) {
    return Math.round(caloriesNorm * CaloriesMinMaxRatio.MIN);
  }
  /**
   *
   * @param {Number} caloriesNorm
   * @returns {Number}
   */
  getCaloriesMax(caloriesNorm) {
    return Math.round(caloriesNorm * CaloriesMinMaxRatio.MAX);
  }
}
