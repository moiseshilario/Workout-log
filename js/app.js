let workouts = [];

function addActivity() {
    const FORM_SIZE = 3;
    let form = document.getElementById("frm");
    let inputs = [];
    
    for (let index = 0; index < FORM_SIZE; index++) {
        inputs.push(form.elements[index].value);
    }

    let workout = new Workout(...inputs);
    addWorkoutInTable(workout);
    workouts.push(workout);
    workout.showWorkout();
}

function addWorkoutInTable(workout) {
    let table = document.getElementById("workoutTable");
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = workout.time;
    cell2.innerHTML = workout.activity;
    cell3.innerHTML = workout.date;
}

