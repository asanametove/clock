'use strict';

window.onload = function () {
    let date = new Date();
    let curTime = new Time(+date.getHours() + date.getMinutes()/60 ,+date.getMinutes(),+date.getSeconds());
    setArrowsData(curTime);

    setInterval(function () {
        curTime.tick();
        setArrowsData(curTime);
    }, 1000);

    function Time(hour, minute, second) {
        return {
            get: get,
            tick: tick
        };

        function tick() {
            second++;
            // console.log(second);
            if(second === 60) {
                second = 0;
                minute++;
                hour += 1/60;
                if(minute === 60) {
                    minute = 0;
                    if(hour === 12) {
                        hour = 0;
                    }
                }
            }
        }

        function get() {
            return {
                hour: hour,
                minute: minute,
                second: second
            }
        }
    }
};

function setArrowsData(curTime) {
    let secArrow = document.querySelector('.arrow-second');
    let minArrow = document.querySelector('.arrow-minute');
    let hourArrow = document.querySelector('.arrow-hour');

    secArrow.style.transform = `rotate(${(curTime.get().second * 6)}deg)`;
    minArrow.style.transform = `rotate(${(curTime.get().minute * 6)}deg)`;
    hourArrow.style.transform = `rotate(${(curTime.get().hour * 30)}deg)`;
}