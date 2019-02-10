//находим стрелочки
let arrowNext = document.querySelector(".next");
let arrowPrev = document.querySelector(".prev");

//логика при клике
arrowNext.addEventListener("click", function() {
  arrowPrev.classList.remove("disabled");
  currentDay++;
  pasteData();
  if (currentDay == response.length - weatherBlocks.length) {
    arrowNext.classList.add("disabled");
  }
});

arrowPrev.addEventListener("click", function() {
  arrowNext.classList.remove("disabled");
  currentDay--;
  pasteData();
  if (currentDay == 0) {
    arrowPrev.classList.add("disabled");
  }
});

//объект с описанием содержимого карточек

var weatherBlockData = {
  months: [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
  ],
  daysOfWeek: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ],
  icons: {
    sunny: [
      "assets/img/sun.png",
      "assets/img/sun.png",
      "assets/img/sun.png",
      "assets/img/sun.png"
    ],
    cloudy: [
      "assets/img/cloud.png",
      "assets/img/rain.png",
      "assets/img/snow.png",
      "assets/img/rain-and-snow.png"
    ]
  },
  precipitation: ["Без осадков", "Снегопад", "Дождь", "Дождь со снегом"]
};

//получаем все карточки

var weatherBlocks = document.querySelectorAll(".weather-block");

// Переменные с ответом от сервера и текущим днем
var response;
var currentDay = 0;

// Запрос из JSON файла

window.onload = function() {
  let request = new XMLHttpRequest();
  request.open("GET", "weather-data.json");
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        response = JSON.parse(this.responseText);
        pasteData();
      } else {
        console.log("Произошла ошибка, статус ошибки: " + this.status);
      }
    }
  };
  request.send(null);
};

function pasteData() {
  //Подставляем данные в карточки с погодой
  for (let i = 0; i < weatherBlocks.length; i++) {
    //День недели
    let day = new Day(response[i + currentDay].date);
    if (!(i + currentDay)) {
      weatherBlocks[i].querySelector(".day-of-week").innerHTML = "Сегодня";
    } else {
      weatherBlocks[i].querySelector(".day-of-week").innerHTML =
        weatherBlockData.daysOfWeek[date.getDay()];
    }
    //Число и месяц
    weatherBlocks[i].querySelector(".date").innerHTML =
      date.getDate + " " + weatherBlockData.month[date.getMonth()];

    //Подстановка подходящей иконки
    let precipitation = 0;
    response[i + currentDay].rain ? precipitation++ : "";
    response[i + currentDay].snow ? (precipitation = precipitation + 2) : "";
    weatherBlocks[i]
      .querySelector("img")
      .setAttribute(
        "src",
        weatherBlockData.icons[response[i + currentDay].cloudiness][
          precipitation
        ]
      );
    // Дневная и ночная температура
    weatherBlocks[i].querySelector(".day").innerHTML =
      "Днём " + response[i + currentDay].temperature.day + "°";
    weatherBlocks[i].querySelector(".night").innerHTML =
      "Ночью " + response[i + currentDay].temperature.night + "°";
    // Текст с типом осадков
    weatherBlocks[i].querySelector(".precipitation").innerHTML =
      weatherBlockData.precipitation[precipitation];
  }
}
