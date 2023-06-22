async function registrate(user_info) {
   let url = "/registrate"
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "text/json"
      },
      body: user_info
   })
   //console.log('данные регистрации: ' + user_info);
   if (response.status == 400) {
      let json = await response.json();
      exception_text.textContent = json.text;
      //console.log('данные регистрации (возврат джейсона): ' + json.text);
   }
   else {
      window.location.href = './account.html';
      //window.location.href;
   }
}