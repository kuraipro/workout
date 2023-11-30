//TODO написать функция для сброса пароля
const users = JSON.parse(localStorage.getItem("users")) || [];

function createNewAccount(email, password) {
  const user = {
    email: email,
    password: password,
    nickname: "",
    id: +Math.random().toString().slice(2),
    isAuth: false,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
// createNewAccount("admin", "admin", "admin007");

function authentication(email, password) {
  users.find((user) => {
    if (user.email === email && user.password === password) {
      isAuth = !isAuth;
    }
  });
}

function changeNickname(id, newNickname) {
  const user = users.find((nick) => nick.id === id);
  user.nickname = newNickname;
  localStorage.setItem("users", JSON.stringify(user));
}

function deleteProfile(id) {
  const indexForDelete = users.findIndex((user) => user.id === id);
  users.splice(indexForDelete, 1);
  localStorage.setItem("users", JSON.stringify(users));
}

const loginInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

async function register(email, password) {
  const userData = {
    email,
    password,
  };

  try {
    let response = await fetch(
      "https://auth-vjhl.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("token", result.token);
      document.location.href = "./profile.html";
    } else alert(result.errorMessage);
  } catch (e) {
    return;
  }
}
