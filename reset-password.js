const loginInput = document.querySelector("#email");

async function resetPassword(email) {
  const userData = {
    email,
  };

  try {
    let response = await fetch(
      "https://auth-vjhl.onrender.com/api/auth/reset-password",
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
      let isSucces = confirm(
        "new password was sand to your email. Do you want to go to login page?"
      );
      if (isSucces) {
        document.location.href = "./login.html";
      }
    } else confirm(errorMessage);
  } catch (e) {
    return;
  }
}
