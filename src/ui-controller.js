const UIController = {
    deleteGoal(id) {
        if (confirm('Delete this goal? All progress will be lost.')) {
            GoalsManager.deleteGoal(id);
            this.refreshUI();
        }
    },
    handleCellClick(goalId, date, type) {
        if (type === CONSTANTS.GOAL_TYPES.BOOLEAN) {
            const entries = GoalsManager.getGoalEntries(goalId);
            const currentValue = entries[date];
            const newValue = currentValue !== true;
            GoalsManager.addEntry(goalId, date, newValue);
            GridRenderer.renderAll();
        } else {
            const entries = GoalsManager.getGoalEntries(goalId);
            const currentValue = entries[date] || '';
            const input = prompt(`Enter value for ${date}:`, currentValue);
            if (input !== null && input !== '') {
                GoalsManager.addEntry(goalId, date, input);
                GridRenderer.renderAll();
            } else if (input === '' && currentValue) {
                if (confirm('Delete this entry?')) {
                    GoalsManager.deleteEntry(goalId, date);
                    GridRenderer.renderAll();
                }
            }
        }
    },
    handleAddEntry(goalId, type) {
        const today = Utils.getTodayDate();
        if (type === CONSTANTS.GOAL_TYPES.BOOLEAN) {
            GoalsManager.addEntry(goalId, today, true);
            GridRenderer.renderAll();
        } else {
            const input = prompt('Enter value for today:');
            if (input !== null && input !== '') {
                GoalsManager.addEntry(goalId, today, input);
                GridRenderer.renderAll();
            }
        }
    },
    changeMonth(goalId, direction) {
        const current = GoalsManager.getMonthOffset(goalId);
        GoalsManager.setMonthOffset(goalId, current + direction);
        GridRenderer.renderAll();
    },
    refreshUI() {
        GoalListRenderer.render();
        GridRenderer.renderAll();
    }
};
