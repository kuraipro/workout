const token = localStorage.getItem("token");

if (!token) {
  document.location.href = "/login.html";
}

const trainings = [];
const inputWeight = document.querySelector("input");
const cards = document.querySelector(".cards");
getResult();

async function addResult(weight) {
  const training = JSON.stringify({
    weight: weight,
  });
  try {
    const response = await fetch(
      "https://auth-vjhl.onrender.com/api/result/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: training,
      }
    );
    const result = await response.json();
    createCard(result);
  } catch (error) {
    console.error(e);
  }
}

const createCard = (element) => {
  let card = `
      <div data-id="${element._id}">
      <h1>Пользователь: ${element.userId}</h1>
      <p>Тренировка: ${element._id}</p>
      <p>Дата: ${element.data} </p>
      <p class="weight">Вес: ${element.weight} </p>
      <button onclick="deleteTraining('${element._id}')">Delete</button>
      <button onclick="updateWeight('${element._id}')">Update</button>
      </div>
      `;
  cards.insertAdjacentHTML("beforeend", card);
};

async function getResult() {
  try {
    let response = await fetch("https://auth-vjhl.onrender.com/api/result", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: token,
      },
    });

    const result = await response.json();
    trainings.push(...result);

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      createCard(element);
    }

    return result;
  } catch (e) {
    console.error(e);
  }
}

async function updateWeight(id) {
  const newWeight = prompt("Введите новый вес");
  const training = JSON.stringify({
    weight: newWeight,
  });
  try {
    const response = await fetch(
      `https://auth-vjhl.onrender.com/api/result/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: training,
      }
    );
    await response.json();
    update(id, newWeight);
  } catch (error) {
    console.error(error);
  }
}

async function deleteTraining(id) {
  try {
    const response = await fetch(
      `https://auth-vjhl.onrender.com/api/result/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const result = await response.json();
    deleteCard(result._id);
  } catch (error) {
    console.error(error);
  }
}

//  "https://auth-vjhl.onrender.com/api/result/update/:id" put body:{weight:100}

const deleteCard = (id) => {
  const index = trainings.findIndex((item) => item._id === id);
  trainings.splice(index, 1);
  const element = document.querySelector(`[data-id="${id}"]`);
  element.innerHTML = null;
};

function update(id, weight) {
  const index = trainings.findIndex((item) => item._id === id);
  trainings[index].weight = weight;
  const training = document.querySelector(`[data-id="${id}"]`);
  const trainingWeight = training.querySelector(".weight");
  trainingWeight.innerText = `Вес: ${weight}`;
}
