async function autorise(user_info) {
    let url = "/autorise"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: user_info
    })
    console.log('данные авторизации: ' + user_info);

    let json = await response.json();

    const data = JSON.parse(user_info)

    if (json) {
        localStorage.setItem('email', data.email);
        localStorage.setItem('password', data.password);
        localStorage.setItem('status', "autorised");
        autorisation_check();
        account_box.style.visibility = "hidden"
    }
    else {
        exception_text.textContent = 'Неверный логин/пароль.';
    }
}