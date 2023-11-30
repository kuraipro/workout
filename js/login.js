if (localStorage.getItem("token")) {
  document.location.href = "./profile.html";
}
const loginInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
async function login(email, password) {
  const userData = {
    email,
    password,
  };

  try {
    let response = await fetch(
      "https://auth-vjhl.onrender.com/api/auth/login",
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
      if (result.token) {
        localStorage.setItem("token", result.token);
        document.location.href = "./profile.html";
      }
    } else alert(result.errorMessage);
  } catch (e) {
    console.error(e);
  }
}
