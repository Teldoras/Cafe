let chosen_tables = []
let times = []
const time_list = document.getElementById('time_list');
const hall_scheme = document.getElementById('hall_scheme');
let box_movement = false;
const BPW = document.getElementById('booking_process_window')
let currentTime = new Date();

document.addEventListener('DOMContentLoaded', function () {
    take_tables_data()
    // console.log('Данные из базы о столиках: ' + JSON.stringify(test_info))
    check_time();
})

time_list.addEventListener('change', async function (event) {
    // console.log(this.value)
    read_bookings(this.value)
    hall_scheme.disabled = false;
})

time_list.addEventListener('change', async function (event) {
    activate_tables()
}, { once: true })

document.getElementById('booking_continue_button').addEventListener('click', function (event) {
    document.getElementById('time_from_list').value = time_list.value
    document.getElementById('time_to_list').value = time_list.value
    BPW.style.visibility = 'visible'
})

document.getElementById('booking_confirm_button').addEventListener('click', function (event) {
    
    send_booking_data(
        chosen_tables,
        document.getElementById('booking_name').value,
        document.getElementById('booking_contacts').value,
        document.getElementById('time_from_list').value,
        document.getElementById('time_to_list').value
    )
    BPW.style.visibility = 'hidden'
})

document.getElementById('BPW_close_button').addEventListener('click', function (event) {
    BPW.style.visibility = 'hidden'
})

function activate_tables() {

    let tables = [].slice.call(document.getElementsByClassName('table'))
    // console.log('столики-объекты: ' + tables)

    tables.forEach(element => {

        element.addEventListener('click', async function (event) {
            event.preventDefault();
            let j = this.id;

            if (chosen_tables.includes(j)) {
                // console.log('столик ' + j + ' уже выбран');
                const index = chosen_tables.indexOf(j)
                if (index > -1) chosen_tables.splice(index, 1)
                this.style.backgroundColor = 'azure';
                // console.log('столик ' + j + ' был удалён, список: ' + chosen_tables);
            }
            else {
                // console.log('столик ' + j + ' ещё не выбран');
                chosen_tables.push(j);
                this.style.backgroundColor = 'greenyellow';
                // console.log('столик ' + j + ' был добавлен, список: ' + chosen_tables);
            }
        })
        //element.disabled = false
    })
}

function check_time() {

    let step = 15;
    let hours = 8;
    let minutes = 0;
    while (hours <= 22) {
        times.push([hours, minutes])
        minutes += step;
        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes -= Math.floor(minutes / 60) * 60;
        }
    }

    
    currentTime = new Date(2025, 1, 1, 14, 25, 11, 0);
    // console.log('текущее время: ' + currentTime);

    fill_times(currentTime, times, time_list)
    fill_times(currentTime, times, document.getElementById('time_from_list'))
    fill_times(currentTime, times, document.getElementById('time_to_list'))
}

function fill_times(startTime, times, target) {
    times.forEach(function (item, index, array) {
        if (item[0] < startTime.getHours()) { }
        else {
            if (item[0] == startTime.getHours()) {
                if (item[1] < startTime.getMinutes()) { }
                else {
                    add_time(item, target);
                }
            }
            else {
                add_time(item, target);
            }
        }
    });
}

function clear_times (target) {
    while (target.firstChild) {
        target.removeChild(target.lastChild);
      } 
}

function add_time(item, target) {

    let new_option = document.createElement('option')
    let item_string = item[0].toString().padStart(2, '0') + ':' + item[1].toString().padStart(2, '0')

    new_option.value = item_string;
    new_option.textContent = item_string;

    target.appendChild(new_option)
}

function read_bookings(time) {
    chosen_tables = []
    take_bookings_data(time)
}

document.getElementById('BPW_controls').addEventListener('mousedown', function(){
    box_movement = true;
    console.log(box_movement)
})

document.addEventListener('mousemove', function(e){
    if (box_movement){
        if (0 < e.pageX < window.innerWidth)
        {
            console.log('horisontal')
            BPW.style.left = e.pageX + "px";
        }
        if (0 < e.pageY < window.innerHeight){
            console.log('vertical')
            BPW.style.top = (e.pageY + (BPW.offsetHeight/2) - (document.getElementById('BPW_controls').offsetHeight/2)) + "px";
        }
        console.log(BPW.style.left, BPW.style.top, e.pageX, e.pageY, window.innerWidth, window.innerHeight)
    }
})

document.addEventListener('mouseup', function(){
    if (box_movement)
        box_movement = false;
})