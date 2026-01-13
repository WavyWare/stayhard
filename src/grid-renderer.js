const GridRenderer = {
    renderCells(goal, entries, monthOffset) {
        const dates = CalendarUtils.getMonthDates(monthOffset);
        return dates.map(date => {
            if (date === null) {
                return `<div class="grid-cell empty"></div>`;
            }
            const value = entries[date];
            const level = LevelCalculator.getLevel(goal.id, value);
            const bgColor = LevelCalculator.getBackgroundColor(level, goal.color);
            const displayValue = value !== undefined && value !== null ? value : '';
            const displayUnit = goal.unit ? ' ' + goal.unit : '';
            return `
        <div class="grid-cell ${level}" 
             style="background: ${bgColor}" 
             title="${date}${displayValue ? ': ' + displayValue + displayUnit : ''}" 
             onclick="UIController.handleCellClick(${goal.id}, '${date}', '${goal.type}')">
        </div>
      `;
        }).join('');
    },
    renderAll() {
        const container = document.getElementById('gridsContainer');
        if (GoalsManager.goals.length === 0) {
            container.innerHTML = '<div class="empty-state">Create a goal to see your progress grid here</div>';
            return;
        }
        container.innerHTML = GoalsManager.goals.map(goal => {
            const entries = GoalsManager.getGoalEntries(goal.id);
            const monthOffset = GoalsManager.getMonthOffset(goal.id);
            const monthLabel = CalendarUtils.getMonthLabel(monthOffset);
            const gridHTML = this.renderCells(goal, entries, monthOffset);
            const stats = StatsCalculator.calculate(goal.id, entries);
            return `
        <div class="goal-grid">
          <h3 style="border-bottom-color: ${goal.color};">${goal.name}</h3>
          <div class="grid-header">
            <button onclick="UIController.changeMonth(${goal.id}, 1)" 
                    style="background: ${goal.color}; border-color: ${goal.color};">← Prev</button>
            <div class="month-label">${monthLabel}</div>
            <button onclick="UIController.changeMonth(${goal.id}, -1)" 
                    style="background: ${goal.color}; border-color: ${goal.color};">Next →</button>
          </div>
          <div class="stats">
            <div class="stat-box"><span class="stat-label">Entries</span>${stats.count}</div>
            <div class="stat-box"><span class="stat-label">Total${goal.unit ? ' (' + goal.unit + ')' : ''}</span>${stats.total}</div>
            <div class="stat-box"><span class="stat-label">Avg${goal.unit ? ' (' + goal.unit + ')' : ''}</span>${stats.average}</div>
          </div>
          <div class="grid">${gridHTML}</div>
          <button class="add-entry" 
                  style="background: ${goal.color}; border-color: ${goal.color};" 
                  onclick="UIController.handleAddEntry(${goal.id}, '${goal.type}')">+ add entry</button>
          <div class="chart-container">
            <canvas id="chart-${goal.id}"></canvas>
          </div>
        </div>
      `;
        }).join('');
        setTimeout(() => {
            GoalsManager.goals.forEach(goal => {
                const entries = GoalsManager.getGoalEntries(goal.id);
                const monthOffset = GoalsManager.getMonthOffset(goal.id);
                ChartRenderer.drawChart(`chart-${goal.id}`, goal, entries, monthOffset);
            });
        }, 0);
    }
};
