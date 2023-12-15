const profileDiv = document.querySelector(".profile");
const newEmail = document.querySelector("#newEmail");
console.log(newEmail);

function logout() {
  localStorage.removeItem("token");
  document.location.href = "./login.html";
}

async function getProfile() {
  try {
    let response = await fetch("https://auth-vjhl.onrender.com/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: token,
      },
    });

    const result = await response.json();
    console.log(result);
    createProfile(result);
    return result;
  } catch (e) {
    console.error(e);
  }
}
getProfile();

const createProfile = (result) => {
  let profile = `
        <div data-id="${result._id}">
        <h1>Данные профиля</h1>
        <p>Имя: ${result.firstName}</p>
        <p>Фамилия: ${result.lastName} </p>
        <p>Пол: ${result.gender} </p>
        <p>Почта: ${result.email} </p>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Изменить почту
      </button>
        </div>
        `;
  profileDiv.insertAdjacentHTML("beforeend", profile);
};

async function changeEmail(newEmail) {
  const userData = {
    newEmail: newEmail.value,
  };

  try {
    let response = await fetch(
      "https://auth-vjhl.onrender.com/api/profile/email-change",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
