'use strict';

window.onload = function () {
    let curTime = new Time(0,0,0);
    let secArrow = document.querySelector('.arrow-second');
    let minArrow = document.querySelector('.arrow-minute');
    let hourArrow = document.querySelector('.arrow-hour');

    setInterval(function () {
        curTime.tick();
        secArrow.style.transform = `rotate(${(curTime.get().second * 6)}deg)`;
        minArrow.style.transform = `rotate(${(curTime.get().minute * 6)}deg)`;
        hourArrow.style.transform = `rotate(${(curTime.get().hour * 30)}deg)`;
    }, 10);

    function Time(hour, minute, second) {
        return {
            get: get,
            tick: tick
        };

        function tick() {
            second++;
            console.log(second);
            if(second === 60) {
                second = 0;
                minute++;
                if(minute === 60) {
                    minute = 0;
                    hour++;
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