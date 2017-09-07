'use strict';


(function (window) {
  function Clock() {
    init();
  }

  function init() {
    //initialization arrows
    let {secArrow,
      minArrow,
      hourArrow,
      elementsClockFace,
      ClockWrap}  = initialElement();

    //set current time
    setTime(secArrow, minArrow, hourArrow);

    //set clock face on clock
    setClockFace(ClockWrap, elementsClockFace);


    //run dinamical clock
    setInterval(function () {
      curTime.tick();
      setTime(secArrow, minArrow, hourArrow);
    }, 1000);
  }

  let date = new Date();
  let currentHour = date.getHours() + date.getMinutes() / 60;
  let currentMinute = date.getMinutes();
  let currentSecond = date.getSeconds();
  let curTime = new Time(currentHour, currentMinute, currentSecond);

  function setTime(sec, min, hour) {
    sec.style.transform = `rotate(${(curTime.get().second * 6)}deg)`;
    min.style.transform = `rotate(${(curTime.get().minute * 6)}deg)`;
    hour.style.transform = `rotate(${(curTime.get().hour * 30)}deg)`;
  }

  function Time(hour, minute, second) {
    return {
      get,
      tick
    };

    function tick() {
      second++;
      if (second === 60) {
        second = 0;
        minute++;
        hour += 1 / 60;
        if (minute === 60) {
          minute = 0;
          if (hour === 12) {
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

  function setClockFace(clockWrap, elementsClockFace) {
    const RADIUS = clockWrap.offsetWidth / 2;
    let elementsClockFaceLength = elementsClockFace.length,
      x0 = RADIUS,
      y0 = 0,
      x = RADIUS,
      y = RADIUS,
      rX = x0 - x,
      rY = y0 - y,
      fullCicle = 360,
      step = fullCicle / elementsClockFaceLength,
      deg = 0.0174532925;

    for (let i = 0; i < elementsClockFaceLength; i++) {
      let c = Math.cos((step * i + step) * deg);
      let s = Math.sin((step * i + step) * deg);
      let x1 = (x + rX * c) - (rY * s);
      let y1 = (y + rX * s) + (rY * c);
      elementsClockFace[i].style.top = y1 + 'px';
      elementsClockFace[i].style.left = x1 + 'px';
    }
  }

  function initialElement() {
    let secArrow = document.querySelector('.arrow-second'),
      minArrow = document.querySelector('.arrow-minute'),
      hourArrow = document.querySelector('.arrow-hour'),
      elementsClockFace = document.getElementsByClassName('hour'),
      ClockWrap = document.querySelector('.clock');
    return {
      secArrow,
      minArrow,
      hourArrow,
      elementsClockFace,
      ClockWrap

    }
  }


  window.clock = new Clock();
})(window);