class Workout {
    constructor(time, activity, date) {
        this.time = time;
        this.activity = activity;
        this.date = date;
    }

    showWorkout() {
        console.log(`Time spent ${this.time}
Activity name: ${this.activity}
Date: ${this.date}`);
    }
}