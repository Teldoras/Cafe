async function take_tables_data() {
   let url = "/take_TD"
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "text/json"
      },
      body: ''
   })

   let json_tables_data = await response.json()
   // console.log('данные о столиках (json): ' + json_tables_data)

   // console.log('данные о столиках (текст): ' + JSON.stringify(json_tables_data))

   let hall = document.getElementById('hall_scheme')

   json_tables_data.forEach(element => {
      let table = document.createElement('button')
      table.id = 'table_' + element.number
      table.className = 'table'
      table.disabled = 'true'
      table.textContent = element.number
      table.style.left = (-10 + element.position_x * 20) +'%'
      table.style.top = (-10 + element.position_y * 20) +'%'
      table.title = 'столик ' + element.number
      hall.appendChild(table)
   });

   return JSON.stringify(json_tables_data);
}

async function take_bookings_data(time) {
   let url = "/take_BD"
   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "text/json"
      },
      body: time
   })

   let json_bookings_data = await response.json()
   // console.log('данные о бронировании (json): ' + json_bookings_data)
   // console.log('данные о бронировании (json): ' + JSON.stringify(json_bookings_data))

   let tables = [].slice.call(document.getElementsByClassName('table'))
   tables.forEach(element => {
      element.style.backgroundColor = 'azure'
      element.disabled = false
   })

   json_bookings_data.forEach(element => {
      let table = document.getElementById('table_' + element.id)
      table.style.backgroundColor = 'darkgrey'
      table.disabled = true
      table.title += '\nзабронирован\nс ' + element.time_from + '\nпо ' + element.time_to;
   })

}

async function send_booking_ta(tables, name, contacts, time_from, time_to)
{
   let url = "/send_BD"

   const tables_ids = chosen_tables.map((table) => table.replace('table_',''))
   let json_booking_ta = {id:tables_ids, name:name, contacts:contacts, time_from:time_from, time_to,time_to}
   // console.log('уходящие данные бронирования: ' + JSON.stringify(json_booking_ta))

   let response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "text/json"
      },
      body: JSON.stringify(json_booking_ta)
   })

   let res = await response.json();
   // console.log('вернувшиеся данные бронирования: ' + JSON.stringify(res))

   if (res.result == true)
   {
      document.getElementById('booking_process_window').style.visibility = 'hidden'
      //clear_times(document.getElementById('time_from_list'))
      //clear_times(document.getElementById('time_to_list'))
      read_bookings(document.getElementById('time_list').value)
   }

   //return JSON.stringify()

}