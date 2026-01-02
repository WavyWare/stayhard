class storage {
    constructor() {
        localStorage.setItem("habits", "[]")
    }

    getHabits() {
        return JSON.parse(localStorage.getItem("habits"));
    }

    setHabits(habits) {
        localStorage.setItem("habits", JSON.stringify(habits));
    }

    addHabit(name, type, color) {
        let randId;
        let habits = this.getHabits();
        let filtered = habits.filter((habit) => {
            habit.id = randId
        });
        while (filtered.length > 0) {
            randId = Math.random().toString(36).substring(2, 8);
        }
        let habit = {
            id: randId,
            name,
            type,
            color,
            entries: []
        }

        habits.push(habit);
        this.setHabits(habits);
    }

    removeHabit(id) {
        this.setHabits(this.getHabits().filter(habit => habit.id !== id));
    }

    getHabit(id) {
        return this.getHabits().filter(habit => habit.id === id)[0];
    }

    updateEntry(habitId, date, value) {
        let habit = this.getHabit(habitId);
        let entries = habit.entries.filter(entry => entry.date !== date);
        entries.push({date, value});
        habit.entries = entries;
        let habitsWithoutChanged = this.getHabits().filter(habit => habit.id !== habitId);
        this.setHabits(habitsWithoutChanged.push(habit));
    }
}