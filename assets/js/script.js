// load local storage values
$(document).ready(function () {


    // displays current date & time
    var timeElement = $("#current-day");
    timeElement.text(moment().format("dddd, Do MMM | h:mm:ss"))

    setInterval(function () {
        timeElement.text(moment().format("dddd, Do MMM | h:mm:ss"));
    }, 1000);

    // hourly time blocks 8am - 5pm
    // each time block is colour coded to indicate current or past
    // .past - grey 
    // .present - light pink
    // .future - light blue
    var hourTimer = moment().hour();
    var hourNow = document.querySelectorAll("#currentHour");
    var hourBgColor = document.querySelectorAll("textarea");
    var times = [];

    for (var i = 0; i < hourNow.length; i++) {
        times.push(hourNow[i].dataset.hour);

    }

    function bgColor() {
        for (var i = 0; i < hourNow.length; i++) {
            if (Number(hourTimer) > Number(times[i])) {
                hourBgColor[i].setAttribute("style", "background-color: #c7c5c5");
            }

            if (Number(hourTimer) === Number(times[i])) {
                hourBgColor[i].setAttribute("style", "background-color: #fabdc6");
            }
            else {

            }
        }
    }

    bgColor();

    // event can be saved into local storage by clicking save button 
    // - grab text content 
    // - use hour as local storage key 
    $(document).on("click", ".save-button", function (event) {
        var taskText = $(this).parent().siblings(".col-8").children("textarea").val();
        var taskTime = $(this).parent().siblings(".col-2").data("hour");
        localStorage.setItem(taskText, taskTime);
        // console.log("this button works");
    });

    // when page is refreshed, events persist
    $(".row").each(function () {
        var timeBlock = $(this).data("hour");
        const existingEvent = localStorage.getItem(timeBlock);
        if (existingEvent) {
            $(this).find("textarea").val(existingEvent);
        }

    });
});
