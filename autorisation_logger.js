
module.exports = function () {
    update_autorisation_log = async function (data) {
        //console.log('привет, логгер');
        let now = new Date();

        //формируем данные в примерном формате xml
        // const xml_string = 
        // `<users>
        //     <user name="` + data.first_name + `">
        //         <email>` + data.email + `</email>
        //         <time>` + now.getDate().toString().padStart(2,'0') + `.` + (now.getMonth() +1).toString().padStart(2,'0') + `, ` + now.getHours().toString().padStart(2,'0') + `:` + now.getMinutes().toString().padStart(2,'0') +  `</time>
        //     </user>
        // </users>`;

        const xml_string =
            `user name:` + data.first_name + `, email: ` + data.email + `,
            time: ` + now.getDate().toString().padStart(2, '0') + `.` + (now.getMonth() + 1).toString().padStart(2, '0') + `, ` + now.getHours().toString().padStart(2, '0') + `:` + now.getMinutes().toString().padStart(2, '0') + `
            `
        
        const fs = require('node:fs');
        const content = xml_string;
        fs.writeFile('./autorisation_logs.xml', content, { flag: 'a+' }, err => {
            if (err) {
                console.error(err);
            } else {
                // file written successfully
            }
        });

        module.exports = { update_autorisation_log };
    }
}