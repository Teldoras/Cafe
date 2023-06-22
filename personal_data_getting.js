async function get_PD(user_info) {
   let url = "/get_PD"
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "text/json"
      },
      body: user_info
   })

   let json = await response.json();
   console.log('клиент получает данные о пользователе.')
   console.log('попытка вывести напрямую: ' + json)
   console.log('попытка вывести stringify: ' + JSON.stringify(json))

   if (true) {
      user_name.value = json.first_name
      user_surname.value = json.last_name
      user_address.value = json.address

      if (json.birthday_date != null) {
         user_birthday.value = json.birthday_date.split('T')[0]
      }

      user_email.value = json.email
      user_phone.value = json.telephone_number
   }
   else {
   }
}