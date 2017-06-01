(() => {
    let sum = 0;

    const addActivity = (event) => {
        const [time, date, activity] = document.getElementsByClassName("data");

        if (time.checkValidity() && date.checkValidity()) {
            event.preventDefault();
            const workout = new Workout(time.value, date.value, activity.value);
            addWorkoutInTable(workout);
            sumHours(parseInt(workout.time));
        }
    };

    const toggleArrows = (event) => {
        let selectedTh = event.currentTarget.cellIndex;
        for (var th = 0; th < 3; th++) {
            if (th != selectedTh) {
                document.getElementsByClassName("arrow-up")[th].style.visibility = '';
                document.getElementsByClassName("arrow-down")[th].style.visibility = '';
            }
        }
        if (document.getElementsByClassName("arrow-up")[selectedTh].style.visibility != 'hidden') {
            document.getElementsByClassName("arrow-up")[selectedTh].style.visibility = 'hidden';
            document.getElementsByClassName("arrow-down")[selectedTh].style.visibility = '';
        } else {
            document.getElementsByClassName("arrow-up")[selectedTh].style.visibility = '';
            document.getElementsByClassName("arrow-down")[selectedTh].style.visibility = 'hidden';
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
        subtractHours(event.target.timeToDelete);
    };

    const sumHours = (hours) => {
        sum += hours;
        document.getElementById("sum").innerHTML = `${sum} hours of exercise`;
        return sum;
    };

    const subtractHours = (hours) => {
        sum -= hours;
        document.getElementById("sum").innerHTML = `${sum} hours of exercise`;
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

