/*
    Author: sotech117
    License: Educational under Brown University
    Date: 1/22/24
 */

// @ STUDENTS: DO NOT MODIFY THIS FILE!!

// generate a random UID for this user, on page load.
const UID = Math.round(Math.random() * 1000000);

// variables to store user interaction data
let num_clicks = 0;
let timestamp_load;
let timestamp_first_click;
let did_misclick = false;
let did_succeed = false;
let mouse_move_distance = 0;
let mouse_prev_pos;

// takes in an event object and updates local storage to contain that event
const recordAction = event => {
    switch (event.type) {
        case 'click':
            if (num_clicks++ === 0) timestamp_first_click = Date.now();
            break;
        case 'load':
            timestamp_load = Date.now();
            break;
        case 'pointermove':
            // deconstruct x,y
            const {pageX, pageY} = event;
            // update distance
            if (mouse_prev_pos != null) {
                const dist = Math.sqrt((pageX - mouse_prev_pos.pageX)*(pageX - mouse_prev_pos.pageX)
                    + (pageY - mouse_prev_pos.pageY) * (pageY - mouse_prev_pos.pageY))
                mouse_move_distance += dist;
            }
            // update prev pos for next
            mouse_prev_pos = {pageX, pageY};
            break;
        case 'beforeunload':
            recordData();
            cleanupHandlers();
            break;
    }
}

// to be called when the user leaves the page to track the user's data in local storage
const recordData = () => {
    alert('here');
    const timestamp_unload = Date.now().toString();

    // get the current data object and parse it
    let data = localStorage.getItem("cs1300-ab-testing-data");
    data = JSON.parse(data);
    // check if parsing is correct
    if (!Array.isArray(data)) {
        alert("Error storing data!!")
        console.error("DATA is not an array")
        return;
    }

    // get version form the meta tag on the html file
    const version = document.querySelector("meta[name='version']").getAttribute("content");
    const uid = UID;

    // calculate metrics
    const time_to_first_click = timestamp_first_click - timestamp_load;
    const time_on_page = timestamp_unload - timestamp_load;

    // update localstorage
    data.push({uid, version, timestamp_load, time_on_page, time_to_first_click, mouse_move_distance, num_clicks, did_misclick, did_succeed});
    localStorage.setItem("cs1300-ab-testing-data", JSON.stringify(data));
}

// to be called on the click that determined when the task is completed sucessfully
const suc = event => {
    // record this event
    recordAction(event);
    alert("You succeeded in the task :)");

    // update succeed flag
    did_succeed = true;

    // redirect user to home
    location.href = 'index.html';
}

// to be called on the click that determined when the task is completed on fail
const fail = event => {
    // record this event
    recordAction(event);
    alert("You failed the task, but keep on trying.");
    did_misclick = true;
}

// section for adding/removing handlers
const cleanupHandlers = () => {
    window.removeEventListener('load', recordAction);
    window.removeEventListener('click', recordAction);
    window.removeEventListener('pointermove', recordAction);
    window.removeEventListener('beforeunload', recordAction);
}

window.addEventListener('load', recordAction);
window.addEventListener('click', recordAction);
window.addEventListener('pointermove', recordAction);
window.addEventListener('beforeunload', recordAction);
