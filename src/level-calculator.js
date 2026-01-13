const LevelCalculator = {
    getLevel(goalId, value) {
        const goal = GoalsManager.goals.find(g => g.id === goalId);
        if (goal.type === CONSTANTS.GOAL_TYPES.BOOLEAN) {
            return value ? CONSTANTS.GRID.LEVEL_TRUE : CONSTANTS.GRID.LEVEL_FALSE;
        }
        if (value === null || value === undefined || value === '') {
            return CONSTANTS.GRID.LEVEL_0;
        }
        const numValue = parseInt(value);
        if (numValue === 0) return CONSTANTS.GRID.LEVEL_0;
        if (numValue <= 2) return CONSTANTS.GRID.LEVEL_1;
        if (numValue <= 5) return CONSTANTS.GRID.LEVEL_2;
        if (numValue <= 10) return CONSTANTS.GRID.LEVEL_3;
        return CONSTANTS.GRID.LEVEL_4;
    },
    getBackgroundColor(level, goalColor) {
        const colors = {
            [CONSTANTS.GRID.LEVEL_0]: '#e8dfd5',
            [CONSTANTS.GRID.LEVEL_1]: `rgba(${Utils.hexToRgb(goalColor)}, 0.25)`,
            [CONSTANTS.GRID.LEVEL_2]: `rgba(${Utils.hexToRgb(goalColor)}, 0.45)`,
            [CONSTANTS.GRID.LEVEL_3]: `rgba(${Utils.hexToRgb(goalColor)}, 0.65)`,
            [CONSTANTS.GRID.LEVEL_4]: `rgba(${Utils.hexToRgb(goalColor)}, 0.85)`,
            [CONSTANTS.GRID.LEVEL_TRUE]: `rgba(${Utils.hexToRgb(goalColor)}, 0.7)`,
            [CONSTANTS.GRID.LEVEL_FALSE]: '#e8dfd5'
        };
        return colors[level] || '#e8dfd5';
    }
};
