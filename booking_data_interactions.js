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
        table.style.left = (-7 + element.position_x * 16) + '%'
        table.style.top = (-10 + element.position_y * 20) + '%'
        table.title = 'Столик ' + element.number
        hall.appendChild(table)
    });

    return JSON.stringify(json_tables_data);
}

async function take_bookings_data(time) {
    let url = "/take_BD"
    let response
    try {
        let timer
        response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "text/json"
            },
            body: time
        })
    
    } catch (ex) {
        console.log(ex)
    }
    //console.log('response', response)
    let tables = [].slice.call(document.getElementsByClassName('table'))
    tables.forEach(element => {
        //console.log('cleared', element.id)
        element.title = `Столик ${element.id.substring(element.id.length - 1)}`
        element.style.backgroundColor = 'azure'
        element.disabled = false
    })

    let json_bookings_data
    try {
        json_bookings_data = await response.json()
    } catch (ex) {
        console.log(ex)
    }

    let table
    json_bookings_data.bookings.forEach(element => {

        table = document.getElementById('table_' + element.id)
        console.log('bisy', table.id)
        table.style.backgroundColor = 'darkgrey'
        table.disabled = true
        //   table.title += `\nзабронирован\nс ${element.time_from} \nпо  ${element.time_to}`;
        table.title += `\nзабронирован\nс ${element.time_from} \nпо  ${element.time_to}`;
    })
    table = null

    let free_tables = [], table_exists
    json_bookings_data.not_bookings.forEach(element => {
        try {
            table_exists = false
            //console.log('not booking: ', element.id, element.time_from, element.time_to)
            for (let i = 0; i < free_tables.length; i++) {
                table = free_tables[i];
                if (table.id == element.id)
                {
                    table_exists = true
                    if (element.time_from < table.time_to)
                        table.time_to = element.time_from
                    else if (element.time_to > table.time_from)
                        table.time_from = element.time_to
                }
            }
            
            if (!table_exists) {
                table = {id: element.id}
                //console.log(time, element.time_from, element.time_to)
                if (time < element.time_from)
                    table.time_to = element.time_from
                else if (time > element.time_to)
                    table.time_from = element.time_to
                //console.log('push: ', table)
                free_tables.push(table)
            } 
        } catch (ex) {
            console.log(ex)
        }
    })
    table = null

    free_tables.forEach(element => {
        //console.log(element.id)
        table = document.getElementById('table_' + element.id)
        //console.log(table)
        //table.title += `\nсвободен\n`
        //console.log(element.time_from, element.time_to)
        table.title += `\nсвободен\n`
        if (element.time_from)
            table.title += `с ${element.time_from} \n`
        if (element.time_to)
            table.title += `по  ${element.time_to}`;
    });

}

async function send_booking_ta(tables, name, contacts, time_from, time_to) {
    let url = "/send_BD"

    const tables_ids = chosen_tables.map((table) => table.replace('table_', ''))
    let json_booking_ta = { id: tables_ids, name: name, contacts: contacts, time_from: time_from, time_to, time_to }
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

    if (res.result == true) {
        document.getElementById('booking_process_window').style.visibility = 'hidden'
        //clear_times(document.getElementById('time_from_list'))
        //clear_times(document.getElementById('time_to_list'))
        read_bookings(document.getElementById('time_list').value)
    }

    //return JSON.stringify()

}