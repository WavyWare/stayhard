const GoalsManager = {
    goals: [],
    entries: {},
    monthOffsets: {},
    init() {
        this.goals = Storage.loadGoals();
        this.entries = Storage.loadEntries();
    },
    addGoal(name, type, unit, color) {
        const goal = {
            id: Date.now(),
            name,
            type,
            unit,
            color,
            createdAt: new Date().toISOString()
        };
        this.goals.push(goal);
        this.entries[goal.id] = {};
        this.monthOffsets[goal.id] = 0;
        this.save();
        return goal;
    },
    deleteGoal(id) {
        this.goals = this.goals.filter(g => g.id !== id);
        delete this.entries[id];
        delete this.monthOffsets[id];
        this.save();
    },
    updateGoal(id, name, unit) {
        const goal = this.goals.find(g => g.id === id);
        if (goal) {
            goal.name = name;
            goal.unit = unit;
            this.save();
        }
    },
    addEntry(goalId, date, value) {
        if (!this.entries[goalId]) {
            this.entries[goalId] = {};
        }
        this.entries[goalId][date] = value;
        Storage.saveEntries(this.entries);
    },
    deleteEntry(goalId, date) {
        if (this.entries[goalId] && this.entries[goalId][date]) {
            delete this.entries[goalId][date];
            Storage.saveEntries(this.entries);
        }
    },
    getGoalEntries(goalId) {
        return this.entries[goalId] || {};
    },
    setMonthOffset(goalId, offset) {
        this.monthOffsets[goalId] = offset;
    },
    getMonthOffset(goalId) {
        return this.monthOffsets[goalId] || 0;
    },
    save() {
        Storage.saveGoals(this.goals);
        Storage.saveEntries(this.entries);
    }
};
GoalsManager.init();
