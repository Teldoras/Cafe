const { Client } = require('pg')
module.exports = function () {
    // получение данных о столиках из базы данных
    this.DB_take_TD = async function () {
        const client = await connection_module()

        let query_content = `SELECT * FROM tables`;

        const res = await client.query(query_content)

        let json = JSON.stringify(res.rows)

        return json;
    }

    // получение данных о бронированиях из базы данных
    this.DB_take_BD = async function (time) {
        const client = await connection_module()

        let query_content

        query_content = `SELECT * FROM bookings WHERE time_from < '${time}' AND time_to > '${time}'`;
        const booking_res = await client.query(query_content)

        let booking_data = []
        let tables_res

        //console.log('booking', booking_res.rows)

        for (i = 0; i < booking_res.rows.length; i++) {

            query_content = `SELECT table_number FROM bookings_tables WHERE booking_id = '${booking_res.rows[i].id}'`;
            tables_res = await client.query(query_content)

            tables_res.rows.forEach(element => {
                booking_data.push({ id: element.table_number, time_from: booking_res.rows[i].time_from.substring(0, 5), time_to: booking_res.rows[i].time_to.substring(0, 5) })
            })
        }

        //console.log('check')

        let not_booking_res
        try {
            query_content = `
            SELECT bookings_tables.table_number AS id, bookings.time_from, bookings.time_to
            FROM  bookings_tables JOIN bookings 
            ON bookings_tables.booking_id = bookings.id `
            if (booking_data.length > 0)
            {
                query_content += `WHERE bookings_tables.table_number NOT IN (`
                for (i = 0; i < booking_data.length; i++) {
                    //console.log('i = ' + i)
                    if (i > 0)
                        query_content += ','
                    //console.log('id = ' + booking_data[i].id)
    
                    query_content += booking_data[i].id;
                }
                query_content += `)`
            }
            not_booking_res = await client.query(query_content)
        } catch (error) {
            console.log('error', error)
        }

        //console.log(query_content)

        //console.log('not booking', not_booking_res.rows)

        let not_bookings = []
        not_booking_res.rows.forEach(element => {
            not_bookings.push({
                id: element.id,
                time_from: element.time_from.substring(0, 5),
                time_to: element.time_to.substring(0, 5)
            })
        });

        //console.log(booking_data)
        //console.log(JSON.stringify(booking_data))
        //console.log(JSON.stringify({booking_data:booking_data, not_booking_data: not_booking_res.rows}))

        return JSON.stringify({ bookings: booking_data, not_bookings: not_bookings });
    }

    //отправление данных о новом бронировании в базу данных
    this.DB_send_BD = async function (dataJSON) {
        const client = await connection_module()

        const data = JSON.parse(dataJSON);
        let query_content = `
            INSERT INTO bookings (user_name, time_from, time_to, contacts) 
            VALUES (${data.name}, ${data.time_from}, ${data.time_to}, ${data.contacts}) 
            RETURNING id;`;
        let res = await client.query(query_content)
        const booking_id = res.rows[0].id

        query_content = `INSERT INTO bookings_tables (booking_id, table_number) VALUES `
        for (let i = 0; i < data.id.length; i++) {
            query_content += `(${booking_id}, ${data.id[i]})`
            if (i < data.id.length - 1) {
                query_content += ','
            }
            else {
                query_content += ';'
            }
        }
        res = await client.query(query_content)
        return JSON.stringify({ result: true, booking_id: booking_id })
    }

    this.connection_module = async function () {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'Cafe website DB',
            password: 'postgres',
            port: 5432,
        })
        await client.connect()
        return client;
    }
}