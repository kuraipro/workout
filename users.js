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
