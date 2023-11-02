// объявил переменную и записал в нее массив
// в котором мы будем хранить результаты тренировок
const workoutResults = [];
//создал функцию для добавления новых результатов тренировок
function addResult(weight, link) {
  //шаблон тренировки

  const result = {
    //создаем генератор id  для каждой тренировки
    id: +Math.random().toString().slice(2),
    weight: weight,
    // стандартная функция для получения текущей даты
    date: new Date(),
    imageLink: link,
  };
  workoutResults.push(result);
}
addResult(90, "/wefwef");
addResult(90, "/wefwef");
addResult(90, "/wefwef");

// создал функцию для удаления тренировок из массива
function removeResult(id) {
  //используем этот метод, чтобы найти
  //индекс нужного элемента в массиве
  const resultDeleteIndex = workoutResults.findIndex(
    // перебираем все элементы массива и записываем их
    //в переменную element, потом сравниваем id элементов
    // массива и id которым мы передаем в функцию
    // по итогу в переменной resultDeleteIndex будет индекс
    // элемента который нам надо удалить
    (element) => element.id === id
  );
  // с помощью функции splice мы удаляем нашу тренирвоку из массива
  // зная индекс этой тренировки
  workoutResults.splice(resultDeleteIndex, 1);
}
//создаем функцию для       изменения веса у нужной тренировки
function changeWeight(id, weight) {
  // с помощью find  мы ищем нужную тренировку в массиве
  // сравнивая id кждого элемента с id  который мы передаем в функцию
  const changeItem = workoutResults.find((item) => item.id === id);
  //в найденном элементе обращаемся к его полю weight
  // и присваиваем ему новое значение, которое передаем через параметр функции
  changeItem.weight = weight;
}
//создаем функцию для       изменения ссылки на картинку у нужной тренировки
function changeImageLink(id, imageLink) {
  // с помощью find  мы ищем нужную тренировку в массиве
  // сравнивая id каждого элемента с id  который мы передаем в функцию
  const changeItem = workoutResults.find((item) => item.id === id);
  //в найденном элементе обращаемся к его полю imageLink
  // и присваиваем ему новое значение, которое передаем через параметр функции
  changeItem.imageLink = imageLink;
}
//создаем функцию для  изменения даты у нужной тренировки
function changeDate(id, newDate) {
  // с помощью find  мы ищем нужную тренировку в массиве
  // сравнивая id каждого элемента с id  который мы передаем в функцию
  const changeItem = workoutResults.find((item) => item.id === id);
  //в найденном элементе обращаемся к его полю date
  // и присваиваем ему новое значение, которое передаем через параметр функции
  changeItem.date = newDate;
}

//очищаем массив с нашими тренировками
function removeAllResults() {
  workoutResults.length = 0;
}

function selectRange(start, finish) {
  const firstDate = new Date(start);
  const secondDate = new Date(finish);
  return workoutResults.filter((traning) => {
    const traningDate = new Date(traning.date);
    if (traningDate >= firstDate && traningDate <= secondDate) {
      return traning;
    }
  });
}
console.log(selectRange("10.10.2023", "11.01.2023"));
