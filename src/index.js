// id template: habitid-dd-mm-rrrr

let test = ""
for (let i = 0; i <= 31; i++) {
    test+='<div class="day-square"></div>';
}

document.querySelector(".habit-calendar").innerHTML = test;