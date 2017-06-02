(() => {
    let totalHours = 0;

    const addActivity = (event) => {
        const [time, activity, date] = document.getElementsByClassName("data");

        if (time.checkValidity() && date.checkValidity()) {
            event.preventDefault();
            const workoutDetais = {
                time: time.value,
                activity: activity.value,
                date: date.value
            };
            const workout = new Workout(workoutDetais);

            addWorkoutInTable(workout);
            totalHours = sumHours(totalHours, parseInt(workout.time));
            updateTotalTime();
        }
    };

    const toggleArrows = (event) => {
        const selectedTh = event.currentTarget.cellIndex;
        const arrowUp = document.getElementsByClassName("arrow-up");
        const arrowDown = document.getElementsByClassName("arrow-down");

        for (var th = 0; th < 3; th++) {
            if (th != selectedTh) {
                arrowUp[th].style.visibility = '';
                arrowDown[th].style.visibility = '';
            }
        }
        if (arrowUp.style.visibility != 'hidden') {
            arrowUp[selectedTh].style.visibility = 'hidden';
            arrowDown[selectedTh].style.visibility = '';
        } else {
            arrowUp[selectedTh].style.visibility = '';
            arrowDown[selectedTh].style.visibility = 'hidden';
        }
    };

    const addWorkoutInTable = (workout) => {
        const row = document.getElementById("workout-table").insertRow(1);
        const cell = [];
        const btnDelete = document.createElement("button");
        btnDelete.addEventListener("click", deleteWorkout);
        btnDelete.timeToDelete = workout.time;
        btnDelete.className = "btn-delete";
        btnDelete.appendChild(document.createTextNode("-"));

        for (let i = 0; i < 4; i++) {
            cell.push(row.insertCell(i));
        }

        cell[0].innerHTML = `${workout.time} h`;
        cell[1].innerHTML = workout.activity;
        cell[2].innerHTML = workout.date;
        cell[3].appendChild(btnDelete);
    };

    const deleteWorkout = (event) => {
        document.getElementById("workout-table").deleteRow(event.target.closest("tr").rowIndex);
        totalHours = subtractHours(totalHours, event.target.timeToDelete);
        updateTotalTime();
    };

    const updateTotalTime = () => {
        document.getElementById("sum").innerHTML = `${totalHours} hours of exercise`;
    };

    const sortTable = (event) => {
        let selectedColumn = event.currentTarget.cellIndex;
        let table, rows, i, switching, currentRow, nextRow, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("workout-table");
        switching = true;
        dir = "asc";

        while (switching) {

            switching = false;
            rows = table.getElementsByTagName("TR");

            for (i = 1, length = rows.length; i < (length - 1); i++) {
                shouldSwitch = false;

                currentRow = rows[i].getElementsByTagName("TD")[selectedColumn];
                nextRow = rows[i + 1].getElementsByTagName("TD")[selectedColumn];

                if (dir == "asc") {
                    if (currentRow.innerHTML.toLowerCase() > nextRow.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (currentRow.innerHTML.toLowerCase() < nextRow.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount === 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    };

    const addEventListenersToElements = () => {
        const tableHeaders = document.getElementsByClassName("table-headers");
        for (let th of tableHeaders) {
            th.addEventListener("click", toggleArrows);
            th.addEventListener("click", sortTable);
        }
        document.getElementById("add-btn").addEventListener("click", addActivity);
    };

    addEventListenersToElements();

})();


