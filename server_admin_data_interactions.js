const { Client } = require('pg')
module.exports = function () {
    this.DB_get_ABD = async function (dataJSON) {

        const client = await this.connection_module()
        const data = JSON.parse(dataJSON)

        let query_content = 'SELECT password, user_type FROM users WHERE email LIKE \'' + data.email + '\'';
        const res = await client.query(query_content)

        if (data.password == res.rows[0].password) {
            if (res.rows[0].user_type > 0) {
                data.result = 'true'

                query_content = `SELECT * FROM bookings;`
                const res_2 = await client.query(query_content)
                // console.log('1 ' + res_2.rows)
                // console.log('2 ' + JSON.stringify(res_2.rows))

                for (let i = 0; i < res_2.rows.length; i++) {
                    let element = res_2.rows[i];
                    query_content = `SELECT array_agg (table_number) FROM bookings_tables WHERE booking_id = ${element.id};`
                    let temp_res = await client.query(query_content)
                    // console.log('3 ' + JSON.stringify(temp_res.rows))
                    // console.log('4 ' + temp_res.rows[0].array_agg)
                    element.tables = temp_res.rows[0].array_agg;
                }

                //console.log('7 ' + JSON.stringify(res_2.rows))

                data.result = JSON.stringify(res_2.rows)

            }
            else {
                data.result = 'false'
            }
        }
        else {
            data.result = 'false'
        }

        //console.log('Итог проверки админа: ' + data.result)
        return data.result
    }

    this.DB_get_AOD = async function (dataJSON) {

        const client = await this.connection_module()
        const data = JSON.parse(dataJSON)

        let query_content = 'SELECT password, user_type FROM users WHERE email LIKE \'' + data.email + '\'';
        const res = await client.query(query_content)

        if (data.password == res.rows[0].password) {
            if (res.rows[0].user_type > 0) {
                data.result = 'true'

                query_content = `SELECT * FROM orders;`
                const res_2 = await client.query(query_content)
                // console.log('1 ' + res_2.rows)
                // console.log('2 ' + JSON.stringify(res_2.rows))

                for (let i = 0; i < res_2.rows.length; i++) {
                    let element = res_2.rows[i];
                    query_content = `SELECT array_agg (goods_id) FROM orders_goods WHERE order_id = ${element.id};`
                    let temp_res = await client.query(query_content)
                    // console.log('3 ' + JSON.stringify(temp_res.rows))
                    // console.log('4 ' + temp_res.rows[0].array_agg)
                    element.goods = temp_res.rows[0].array_agg;
                }

                //console.log('данные о заказах' + JSON.stringify(res_2.rows))

                data.result = JSON.stringify(res_2.rows)

            }
            else {
                data.result = 'false'
            }
        }
        else {
            data.result = 'false'
        }

        //console.log('Итог проверки админа: ' + data.result)
        return data.result
    }

    this.DB_change_BS = async function (dataJSON) {

        const client = await this.connection_module()
        
        // console.log(dataJSON)
        // console.log(JSON.stringify(dataJSON))

        const data = JSON.parse(dataJSON)

        // console.log(data)
        // console.log(JSON.stringify(data))

        let query_content = `UPDATE bookings SET state = ` + data.new_state + ` WHERE id = ` + data.booking_id + `;`
        const res = await client.query(query_content)

        console.log(res)
        console.log(JSON.stringify(res))

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