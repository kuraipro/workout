const token = localStorage.getItem("token");
if (!token) {
  document.location.href = "./login.html";
}

const passwordInput = document.querySelector("#password");
const newPasswordInput = document.querySelector("#new-password");

async function changePassword(currentPassword, newPassword) {
  const userData = {
    currentPassword: currentPassword,
    newPassword: newPassword,
  };

  try {
    let response = await fetch(
      "https://auth-vjhl.onrender.com/api/profile/update-password",
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

    if (response.ok) {
      localStorage.removeItem("token");
      document.location.href = "./login.html";
    }
  } catch (e) {
    console.error(e);
  }
}
