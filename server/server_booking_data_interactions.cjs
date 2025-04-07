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

        query_content = `SELECT * FROM bookings WHERE time_from < '` + time + `' AND time_to > '` + time + `'`;
        const booking_res = await client.query(query_content)

        let json

        json = JSON.stringify(booking_res.rows)

        let booking_data = []
        let tables_res

        for (i = 0; i < booking_res.rows.length; i++) {

            query_content = `SELECT table_number FROM bookings_tables WHERE booking_id = '` + booking_res.rows[i].id + `'`;
            tables_res = await client.query(query_content)

            tables_res.rows.forEach(element => {
                booking_data.push({ id: element.table_number, time_from: booking_res.rows[i].time_from.substring(0, 5), time_to: booking_res.rows[i].time_to.substring(0, 5) })
            })
        }

        return JSON.stringify(booking_data);
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
            if (i < data.id.length - 1){
                query_content += ','
            }
            else{
                query_content += ';'
            }
        }
        res = await client.query(query_content)
        return JSON.stringify({result: true, booking_id: booking_id})
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