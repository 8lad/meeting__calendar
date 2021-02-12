'use strict';
document.addEventListener('DOMContentLoaded', () => {

    let mainSection = document.querySelector('.main'),
        mainForm = mainSection.querySelector('.main__inner'),
        eventSection = mainSection.querySelector('.event'),
        warningMessage = mainSection.querySelector('.event__error'),
        eventForm = document.querySelector('.event__form'),
        selectTasks = document.querySelector('[name="member"]'),
        confirmDelete = document.querySelector('.delete'),
        taskDay = document.querySelector('[name="day"]'),
        taskName = document.querySelector('.delete__title-value'),
        taskText = document.querySelector('[name ="descr"]'),
        taskPerson = document.querySelector('[name="person"]'),
        taskTime = document.querySelector('[name="time"]'),
        filledBoxes,
        hourTask = {},
        currentBox;


    // Function for opening frame
    function changeVisibility(firstElement, secondElement, actionClass) {
        firstElement.classList.add(actionClass);
        secondElement.classList.remove(actionClass);
    }
    // Function for removing class
    function removingClass(element, removedClass) {
        element.classList.remove(removedClass);
    }
    // Function for adding class
    function addingClass(element, addedClass) {
        element.classList.add(addedClass);
    }

    // Create event listener for main section
    mainSection.addEventListener('click', (e) => {

        e.preventDefault();

        // Open screen witn the event options
        if (e.target.classList.contains('main__form-event')) {
            changeVisibility(eventSection, mainForm, 'active');
        }
        // Close screen witn the event options
        if (e.target.classList.contains('event__cancel')) {
            changeVisibility(mainForm, eventSection, 'active');
        }
        // Close warning message
        if (e.target.classList.contains('event__close')) {
            removingClass(warningMessage, 'active');
        }
        // Create event 
        if (e.target.classList.contains('event__create')) {

            hourTask.text = taskText.value;
            hourTask.person = taskPerson.value;
            hourTask.day = taskDay.value;
            hourTask.time = taskTime.value;

            let taskIndex = `[data-${hourTask.day}="${hourTask.time}"]`,
                taskEvent = document.querySelector(taskIndex);
            if (taskEvent.firstChild) {
                addingClass(warningMessage, 'active');
                return false;
            }
            if (taskEvent && hourTask.text != '') {
                removingClass(warningMessage, 'active');
                taskEvent.innerHTML = `<div class="main__table-box filled ${hourTask.person}"> ${hourTask.text} <img class="delete-event" src="../images/close-box.svg" alt="close icon"> 
                    </div>`;
                changeVisibility(mainForm, eventSection, 'active');

                eventForm.reset();
            } else {
                return false;
            }
        }

        // Working with delete task window
        if (e.target.classList.contains('delete-event')) {
            addingClass(confirmDelete, 'active');
            currentBox = e.target;
            let title = currentBox.parentNode.textContent;
            taskName.textContent = title;
        }
        if (e.target.classList.contains('delete__no')) {
            removingClass(confirmDelete, 'active');
        }
        if (e.target.classList.contains('delete__yes')) {
            currentBox.parentNode.remove();
            removingClass(confirmDelete, 'active');
        }

    });

    // Selecting tasks by name of participans

    selectTasks.addEventListener('change', () => {
        filledBoxes = mainSection.querySelectorAll('.filled');
        filledBoxes.forEach((item) => {
            addingClass(item, 'menu__table-box--hidden');
            if (selectTasks.value == 'All') {
                removingClass(item, 'menu__table-box--hidden');
            } else if (selectTasks.value == 'Maria' && item.classList.contains('Maria')) {
                removingClass(item, 'menu__table-box--hidden');
            } else if (selectTasks.value == 'Bob' && item.classList.contains('Bob')) {
                removingClass(item, 'menu__table-box--hidden');
            } else if (selectTasks.value == 'Alex' && item.classList.contains('Alex')) {
                removingClass(item, 'menu__table-box--hidden');
            } else {
                return false;
            }

        });

    });

});