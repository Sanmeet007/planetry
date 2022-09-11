const imageSrcDir = "./planets";

const logo_text = document.querySelector(".logo .text");
const logo_subtext = document.querySelector(".logo .sub-text");
const cards = document.querySelectorAll(".card-n");
const inc_icon = document.querySelector("#inc-icon");
const dec_icon = document.querySelector("#dec-icon");
const modal = document.querySelector(".modal");
const planet_list_buttons = document.querySelectorAll(".planet-list > button");
const root = document.querySelector(":root");
const planet_img_el = document.querySelector(".planet-image  img");
const navTriggerBtn = document.querySelector("#nav-trigger-btn");
const modalCloseBtn = document.querySelector("#modal-close-btn");
const imageView = document.querySelector(".full-image img");
const imageViewItems = document.querySelectorAll(".display-image");

const gravityEl = document.querySelector("#g");
const radiusEl = document.querySelector("#r");
const ageEl = document.querySelector("#age");
const distEl = document.querySelector("#dist");

const inputWeightEl = document.querySelector("#input-weight");
const inputSelectEl = document.querySelector("#wght-type");

const weightResult = document.querySelector("#weight-result");
const weightResultType = document.querySelector("#weight-result-type");

const weightPercentValue = document.querySelector("#percent-value");
const decIcon = document.querySelector("#dec-icon");
const incIcon = document.querySelector("#inc-icon");

const planetData = {
  mercury: {
    tagline: "Smallest planet",
    axis_tilt: 0.03,
    gravity_times: 0.38,
    day_hours: "58d 15h 30m",
    radius: 2439.7,
    g: 3.7,
    age: 4503,
    distance_from_sun: "5.7 * 10⁷",
  },
  venus: {
    tagline: "Hottest planet",
    axis_tilt: 2.64,
    gravity_times: 0.9,
    day_hours: "116d 18h 0m",
    radius: 6051.8,
    g: 8.87,
    age: 4503,
    distance_from_sun: "1.08 * 10⁸",
  },
  earth: {
    tagline: "Our Home",
    axis_tilt: 23.44,
    gravity_times: 1,
    day_hours: "1d 0h 0m",
    radius: 6371,
    g: 9.807,
    age: 4543,
    distance_from_sun: "1.5 * 10⁸",
  },
  mars: {
    tagline: "Red planet",
    axis_tilt: 25.19,
    gravity_times: 0.38,
    day_hours: "1d 0h 37m",
    radius: 3389.5,
    g: 3.721,
    age: 4603,
    distance_from_sun: "2.28 * 10⁸",
  },
  jupiter: {
    tagline: "Gas giant planet",
    axis_tilt: 3.13,
    gravity_times: 2.53,
    day_hours: "0d 9h 56m",
    radius: 69_911,
    g: 24.79,
    age: 4603,
    distance_from_sun: "7.79 * 10⁸",
  },
  saturn: {
    tagline: "Ringed Planet",
    axis_tilt: 26.73,
    gravity_times: 1.07,
    day_hours: "0h 10h 34m",
    radius: 58_232,
    g: 10.44,
    age: 4503,
    distance_from_sun: "1.43 * 10⁹",
  },
  uranus: {
    tagline: "The Georgium Sidus",
    axis_tilt: 82.23,
    gravity_times: 0.89,
    day_hours: "0d 17h 14m",
    radius: 25_362,
    g: 8.87,
    age: 4503,
    distance_from_sun: "2.38 * 10⁹",
  },
  neptune: {
    tagline: "Ice Giant",
    axis_tilt: 28.32,
    gravity_times: 1.14,
    day_hours: "0d 16h 6m",
    radius: 24_622,
    g: 11.15,
    age: 4503,
    distance_from_sun: "4.5* 10⁹",
  },
};

let currentPlanet = planetData.earth;
const planet_names = Object.keys(planetData);

planet_list_buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    planet_list_buttons.forEach((el) => el.classList.remove("active"));
    const planet_name = planet_names[index];
    const planet = planetData[planet_name];
    currentPlanet = planet;
    logo_text.textContent = planet_name;
    logo_subtext.textContent = planet.tagline;

    ["", "-la", "-l", "-a", "-s", "-p", "-h", "-t"].forEach((c) => {
      const key = `--current-clr${c}`;
      const value = `var(--${planet_name}-clr${c})`;
      document.documentElement.style.setProperty(key, value);
    });

    planet_img_el.src = imageSrcDir + "/" + planet_name + ".png";

    cards[0].querySelector(".card-content").textContent =
      planet.axis_tilt + "°";
    cards[1].querySelector(".card-content").textContent =
      planet.gravity_times + "x";
    cards[2].querySelector(".card-content").textContent = planet.day_hours;

    gravityEl.textContent = planet.g + " m/s²";
    radiusEl.textContent = planet.radius + " km";
    ageEl.textContent = planet.age + " billion years";
    distEl.textContent = planet.distance_from_sun + " km";

    button.classList.add("active");
    setWeight();
  });
});

inputWeightEl.addEventListener("input", () => setWeight());
inputSelectEl.addEventListener("input", () => setWeight());

const calculateWeightOn = (planet, weight_value, weight_unit) => {
  let weight = (weight_value / planetData.earth.g) * planet.g;
  return Math.fround(weight).toFixed(1);
};

const calculateWeightPercent = (planet, weight_value, weight_unit) => {
  let weight = calculateWeightOn(planet, weight_value, weight_unit);
  const valchange = Math.abs(weight_value - weight);
  const percent = (valchange / weight_value) * 100;
  const final = Math.round(percent);
  if (final == NaN) {
    return 0;
  }
  return final;
};

const calculateWeightPercentType = (planet, weight_value, weight_unit) => {
  let weight = calculateWeightOn(planet, weight_value, weight_unit);
  const valchange = weight - weight_value;
  if (valchange >= 0) {
    return "inc";
  } else {
    return "dec";
  }
};

const setIcon = (type) => {
  if (type == "dec") {
    incIcon.style.display = "none";
    decIcon.style.display = "block";
  } else {
    incIcon.style.display = "block";
    decIcon.style.display = "none";
  }
};
const setWeight = () => {
  const userWeight = inputWeightEl.value;
  const weightUnit = inputSelectEl.value;
  const planet = currentPlanet;
  const calculatedWeight = calculateWeightOn(planet, userWeight, weightUnit);
  weightResultType.textContent = weightUnit;
  weightResult.textContent = calculatedWeight;
  if (userWeight == 0) {
    weightPercentValue.textContent = 0 + "%";
  } else {
    weightPercentValue.textContent =
      calculateWeightPercent(planet, userWeight, weightUnit) + "%";
  }
  setIcon(calculateWeightPercentType(planet, userWeight, weightUnit));
};
