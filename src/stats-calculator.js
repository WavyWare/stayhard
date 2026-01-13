const StatsCalculator = {
    calculate(goalId, entries) {
        const goal = GoalsManager.goals.find(g => g.id === goalId);
        let count = 0;
        let total = 0;
        Object.values(entries).forEach(value => {
            if (goal.type === CONSTANTS.GOAL_TYPES.NUMBER && value !== null && value !== undefined) {
                const num = parseInt(value);
                if (!isNaN(num)) {
                    count++;
                    total += num;
                }
            } else if (goal.type === CONSTANTS.GOAL_TYPES.BOOLEAN) {
                count++;
                total += value ? 1 : 0;
            }
        });
        const average = count > 0 ? (total / count).toFixed(1) : 0;
        return { count, total, average };
    }
};
