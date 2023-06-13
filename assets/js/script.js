var saveButtonEl = $('.saveBtn');
var textAreaEl = $('.description');


$(function () {

  var timeBlockEl = document.querySelectorAll('.time-block');
  var dailyTaskHistory = JSON.parse(localStorage.getItem('Tasks')) || [];
  var currentHour = dayjs().hour();


  saveButtonEl.on('click', function () {

    var thisParentId = $(this).parent().attr('id');
    var thisParentEl = $(this).parent();
    var thisSibling = $(thisParentEl).children().eq(1);
    var textInput = $(thisSibling).val();
    var thisSiblingParentId = $(thisSibling).parent().attr('id');
    var dailyTaskObj = {
      tasks: textInput,
      parent: thisParentId,
    }


    if (thisSiblingParentId === thisParentId) {
      dailyTaskHistory.push(dailyTaskObj);
      localStorage.setItem('Tasks', JSON.stringify(dailyTaskHistory));
    }
  });


  var dailyTaskHistory = JSON.parse(localStorage.getItem('Tasks')) || [];

  for (var i = 0; i < dailyTaskHistory.length; i++) {

    var timeBlock = $('#' + dailyTaskHistory[i].parent).children('textarea');
    timeBlock.text(dailyTaskHistory[i].tasks);
  }



  timeBlockEl.forEach(myFunction);
  function myFunction() {

    for (var i = 0; i < timeBlockEl.length; i++) {
      var id = parseInt($(timeBlockEl[i]).attr('id').split('-')[1]);

      if (id === currentHour) {
        $(timeBlockEl[i]).addClass('present');
      }

      if (id < currentHour) {
        $(timeBlockEl[i]).addClass('past');
      }

      if (id > currentHour) {
        $(timeBlockEl[i]).addClass('future');
      }
    }
  }



  function updateTime() {
    var todaysTime = dayjs();
    $('#currentDay').text(todaysTime.format('dddd, MMMM D YYYY [at] hh:mm:ss a'));
  }
  function currentTime() {
    var timer = setInterval(function () {
      updateTime();
    }, 1000);
  }
  updateTime();
  currentTime();


});




