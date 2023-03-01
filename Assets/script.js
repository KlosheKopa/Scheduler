//Declaring global variables
const currentDate = dayjs().format('dddd, MMMM YYYY');
const currentHour = dayjs();
//Test variable
//const currentHour = dayjs().set('hour', 12).set('minute', 0).set('second', 0);
const scheduleEl = $("#schedule");
const nineAm = {
  classId: "#9am", 
  hour: dayjs().set('hour', 9).set('minute', 0).set('seconds', 0),
};
const tenAm = {
  classId: "#10am", 
  hour: dayjs().set('hour', 10).set('minute', 0).set('second', 0)
};
const elevenAm = {
  classId: "#11am", 
  hour: dayjs().set('hour', 11).set('minute', 0).set('second', 0)
};
const twelvePm = {
  classId: "#12pm", 
  hour: dayjs().set('hour', 12).set('minute', 0).set('second', 0)
};
const onePm = {
  classId: "#1pm", 
  hour: dayjs().set('hour', 13).set('minute', 0).set('second', 0)
};
const twoPm = {
  classId: "#2pm", 
  hour: dayjs().set('hour', 14).set('minute', 0).set('second', 0)
};
const threePm = {
  classId: "#3pm", 
  hour: dayjs().set('hour', 15).set('minute', 0).set('second', 0)
};
const fourPm = {
  classId: "#4pm", 
  hour: dayjs().set('hour', 16).set('minute', 0).set('second', 0)
};
const fivePm = {
  classId: "#5pm", 
  hour: dayjs().set('hour', 17).set('minute', 0).set('second', 0)
};
//Array of objects for the various hour classes and their time counterparts
const times = [nineAm, tenAm, elevenAm, twelvePm, onePm, twoPm, threePm, fourPm, fivePm];

//Gets saved events from storage, puts them in an array and returns them
function readEventsFromStorage(){
  let events = localStorage.getItem('events');
  if (events) {
    events = JSON.parse(events);
  } else {
    events = [];
  }
  return events;
}

//Takes an id string and compares it to the objects in the times array to return the corresponding time
function getTimeIdValue(id){
  for (let i = 0; i < times.length; i++){
    let time = times[i];
    if(time.classId === id){
      return time.hour;
    }
  }
}

//Saves events to storage
function saveEventsToStorage(events){
  localStorage.setItem('events', JSON.stringify(events));
}

//Removes and then applies the style classes based on the time differences
function applyStyleClass(elementId){
  let hour = getTimeIdValue(elementId);
  let element = $(elementId);
  let diff = parseInt(currentHour.diff(hour, 'hour'));

  element.removeClass('past');
  element.removeClass('present');
  element.removeClass('future');
  
  if(diff > 1){
    element.addClass('past');
  } else if(diff === 0){
    element.addClass('present');
  } else {
    element.addClass('future');
  }
}

//Parent function to loop through the times array for styling
function parentApplyStyleClass(){
  for (let i = 0; i < times.length; i++){
    let time = times[i];
    applyStyleClass(time.classId);
  }
}

//Loads saved events to the page and calls the styling function
function loadEventsToPage(){
  let events = readEventsFromStorage();

  parentApplyStyleClass();

  for (let i = 0; i < events.length; i++){
    let event = events[i];
    let parentId = "#" + event.eventId;
    let parentEl = $(parentId);
    let childEl = parentEl.children().eq(1);
    childEl.text(event.eventText);
  }
}

//Handler for the saving of an event
function handleSaveEvent(){
  let parentEl = $(this).parent();
  let parentId = parentEl.attr('id');
  let value = parentEl.children().eq(1).val();

  let event = {
    eventId: parentId,
    eventText: value,
  };

  let events = readEventsFromStorage();
  events.push(event);
  saveEventsToStorage(events);

  loadEventsToPage();
}

//Sets the header time
function setHeaderTime(){
  let currentDay = $("#currentDay");
  currentDay.text(currentDate);
}



$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  scheduleEl.on('click', '.saveBtn', handleSaveEvent);

  loadEventsToPage();

  setHeaderTime();


  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
