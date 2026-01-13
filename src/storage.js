const Storage = {
    loadGoals() {
        const stored = localStorage.getItem(CONSTANTS.STORAGE.GOALS_KEY);
        return stored ? JSON.parse(stored) : [];
    },
    saveGoals(goals) {
        localStorage.setItem(CONSTANTS.STORAGE.GOALS_KEY, JSON.stringify(goals));
    },
    loadEntries() {
        const stored = localStorage.getItem(CONSTANTS.STORAGE.ENTRIES_KEY);
        return stored ? JSON.parse(stored) : {};
    },
    saveEntries(entries) {
        localStorage.setItem(CONSTANTS.STORAGE.ENTRIES_KEY, JSON.stringify(entries));
    },
    loadTheme() {
        return localStorage.getItem(CONSTANTS.STORAGE.THEME_KEY) || CONSTANTS.COLORS.default;
    },
    saveTheme(color) {
        localStorage.setItem(CONSTANTS.STORAGE.THEME_KEY, color);
    },
    clearAll() {
        localStorage.removeItem(CONSTANTS.STORAGE.GOALS_KEY);
        localStorage.removeItem(CONSTANTS.STORAGE.ENTRIES_KEY);
    }
};
