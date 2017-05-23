let app = function () {

    let workouts = [];
    let sum = 0;

    function addActivity(){
        const FORM_SIZE = 3;
        let form = document.getElementById("frm");
        let inputs = [];

        for (let index = 0; index < FORM_SIZE; index++) {
            inputs.push(form.elements[index].value);
        }

        let workout = new Workout(...inputs);
        addWorkoutInTable(workout);
        sumHours(parseInt(workout.time));
        workouts.push(workout);
        workout.showWorkout();
    }

    function addWorkoutInTable(workout) {
        let table = document.getElementById("workoutTable");
        let row = table.insertRow(1);
        let cell = [];
        let btnDelete = document.createElement("button");
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

    function sumHours(hours) {
        sum += hours;
        document.getElementById("sum").innerHTML = `${sum} hours of exercise`;
    }

    return { addActivity: addActivity, addWorkoutInTable: addWorkoutInTable, sumHours: sumHours };
}();