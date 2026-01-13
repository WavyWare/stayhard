const GoalListRenderer = {
    render() {
        const list = document.getElementById('goalsList');
        if (GoalsManager.goals.length === 0) {
            list.innerHTML = '<div class="empty-state">No goals yet. Create one to get started!</div>';
            return;
        }
        list.innerHTML = GoalsManager.goals.map(goal => {
            const entries = GoalsManager.getGoalEntries(goal.id);
            const count = Object.keys(entries).length;
            const typeBadge = goal.type === CONSTANTS.GOAL_TYPES.NUMBER ? '🔢' : '✓';
            return `
        <div class="goal-item" style="border-left-color: ${goal.color}">
          <div class="goal-info">
            <h3>${goal.name}</h3>
            <p><span class="goal-type">${typeBadge} ${goal.type}</span> ${count} entries</p>
          </div>
          <div class="goal-actions">
            <button class="btn-edit" 
                    style="background: ${goal.color}; border-color: ${goal.color};" 
                    onclick="FormHandler.openEditModal(${goal.id})">edit</button>
            <button class="btn-delete" onclick="UIController.deleteGoal(${goal.id})">del</button>
          </div>
        </div>
      `;
        }).join('');
    }
};
