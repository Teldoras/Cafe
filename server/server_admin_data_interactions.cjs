const { Client } = require('pg')
module.exports = function () {
    this.DB_get_ABD = async function (dataJSON) {
        const client = await this.connection_module()
        const data = JSON.parse(dataJSON)

        console.log(dataJSON)
        console.log(data)

        let query_content = `SELECT password, user_type FROM users WHERE email LIKE '${data.email}'`;
        const res = await client.query(query_content)

        let state = ''
        if (data.state != null)
        {
            state = `WHERE state = ${data.state}`
        }

        if (data.password == res.rows[0].password) {
            if (res.rows[0].user_type > 0) {
                data.result = 'true'
                query_content = `SELECT * FROM bookings ${state} ORDER BY time_from ASC;`
                //query_content = `SELECT * FROM bookings WHERE state = ${1} ORDER BY time_from ASC;`
                const res_2 = await client.query(query_content)

                for (let i = 0; i < res_2.rows.length; i++) {
                    let element = res_2.rows[i];
                    query_content = `
                        SELECT array_agg (table_number) FROM bookings_tables 
                        WHERE booking_id = ${element.id};`
                    let temp_res = await client.query(query_content)
                    element.tables = temp_res.rows[0].array_agg;
                }
                data.result = JSON.stringify(res_2.rows)
            }
            else {
                data.result = 'false'
            }
        }
        else {
            data.result = 'false'
        }
        return data.result
    }

    this.DB_get_AOD = async function (dataJSON) {
        const client = await this.connection_module()
        const data = JSON.parse(dataJSON)

        let query_content = `SELECT password, user_type FROM users WHERE email LIKE '${data.email}'`;
        const res = await client.query(query_content)

        let state = ''
        if (data.state != null)
        {
            state = `WHERE state = ${data.state}`
        }

        if (data.password == res.rows[0].password) {
            if (res.rows[0].user_type > 0) {
                data.result = 'true'
                query_content = `SELECT * FROM orders ${state} ORDER BY time ASC;`
                const res_2 = await client.query(query_content)

                for (let i = 0; i < res_2.rows.length; i++) {
                    let element = res_2.rows[i];
                    query_content = `
                        SELECT goods.goods_name, orders_goods.quantity 
                        FROM goods JOIN orders_goods ON id = goods_id 
                        WHERE orders_goods.order_id = ${element.id};`
                    let temp_res = await client.query(query_content)
                    for (let j = 0; j < temp_res.rows.length; j++) {
                        if (j == 0)
                            order_text = '';
                        order_text += `${temp_res.rows[j].goods_name}: ${temp_res.rows[j].quantity}`
                        if (j != temp_res.rows.length - 1)
                            order_text += `, `
                    }
                    element.goods = order_text;
                }
                data.result = JSON.stringify(res_2.rows)
            }
            else {
                data.result = 'false'
            }
        }
        else {
            data.result = 'false'
        }
        return data.result
    }

    this.DB_change_BS = async function (dataJSON) {
        const client = await this.connection_module()
        const data = JSON.parse(dataJSON)
        let query_content = `UPDATE bookings SET state = ${data.new_state} WHERE id = ${data.booking_id};`
        const res = await client.query(query_content)
    }

    this.DB_change_OS = async function (dataJSON) {
        const client = await this.connection_module()
        const data = JSON.parse(dataJSON)
        let query_content = `UPDATE orders SET state = ${data.new_state} WHERE id = ${data.order_id};`
        const res = await client.query(query_content)
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