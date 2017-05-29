(() => {
    const workouts = [];
    const addBtn = document.getElementById("addBtn");
    let sum = 0;

    addBtn.addEventListener("click", addActivity);

    function addActivity(event) {
        const time = document.getElementById("time");
        const date = document.getElementById("datepicker");
        const select = document.getElementById("activity");
        const activity = select.options[select.selectedIndex].text;

        if (time.checkValidity() && date.checkValidity()) {
            event.preventDefault();

            const workout = new Workout(time.value, activity, date.value);
            addWorkoutInTable(workout);
            sumHours(parseInt(workout.time));
            workouts.push(workout);
        }
    }

    function addWorkoutInTable(workout) {
        const table = document.getElementById("workoutTable");
        let row = table.insertRow(1);
        let cell = [];
        let btnDelete = document.createElement("button");
        btnDelete.addEventListener("click", deleteWorkout);
        btnDelete.timeToDelete = workout.time;
        btnDelete.className = "btn-delete";
        let t = document.createTextNode("-");
        btnDelete.appendChild(t);

        for (let i = 0; i < 4; i++) {
            cell.push(row.insertCell(i));
        }

        cell[0].innerHTML = `${workout.time} h`;
        cell[1].innerHTML = workout.activity;
        cell[2].innerHTML = workout.date;
        cell[3].appendChild(btnDelete);
    }

    function deleteWorkout(event) {
        let i = event.target.closest("tr").rowIndex;
        document.getElementById("workoutTable").deleteRow(i);
        subtractHours(event.target.timeToDelete);
    }

    function sumHours(hours) {
        sum += hours;
        document.getElementById("sum").innerHTML = `${sum} hours of exercise`;
    }

    function subtractHours(hours) {
        sum -= hours;
        document.getElementById("sum").innerHTML = `${sum} hours of exercise`;
    }
})();

