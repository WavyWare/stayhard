const FormBuilder = {
    buildAddGoalForm() {
        return `
      <div class="form-group">
        <label>Goal Name</label>
        <input type="text" id="goalName" required placeholder="e.g. Study hours">
      </div>
      <div class="form-group">
        <label>Type</label>
        <select id="goalType" required onchange="FormBuilder.toggleUnitInput()">
          <option value="">-- Select --</option>
          <option value="${CONSTANTS.GOAL_TYPES.NUMBER}">Number (e.g. hours)</option>
          <option value="${CONSTANTS.GOAL_TYPES.BOOLEAN}">Yes/No (e.g. did it?)</option>
        </select>
      </div>
      <div class="form-group" id="numberUnitGroup" style="display: none;">
        <label>Unit Name (optional)</label>
        <input type="text" id="goalUnit" placeholder="e.g. hours, km, reps">
      </div>
      <div class="form-group">
        <label>Goal Color</label>
        <div class="color-select">
          ${CONSTANTS.COLORS.goal.map((c, i) => `
            <div class="color-option ${i === 0 ? 'selected' : ''}" 
                 style="background: ${c};" 
                 onclick="FormBuilder.selectColor(this, '${c}')"></div>
          `).join('')}
        </div>
        <input type="hidden" id="goalColor" value="${CONSTANTS.COLORS.default}">
      </div>
      <button type="submit" class="btn-submit">+ CREATE GOAL</button>
    `;
    },
    buildEditGoalForm(goal) {
        return `
      <div class="form-group">
        <label>Goal Name</label>
        <input type="text" id="editGoalName" required value="${goal.name}">
      </div>
      ${goal.type === CONSTANTS.GOAL_TYPES.NUMBER ? `
        <div class="form-group">
          <label>Unit Name</label>
          <input type="text" id="editGoalUnit" value="${goal.unit || ''}">
        </div>
      ` : ''}
      <button type="submit" class="btn-submit">SAVE CHANGES</button>
    `;
    },
    toggleUnitInput() {
        const unitGroup = document.getElementById('numberUnitGroup');
        const goalType = document.getElementById('goalType').value;
        unitGroup.style.display = goalType === CONSTANTS.GOAL_TYPES.NUMBER ? 'block' : 'none';
    },
    selectColor(element, color) {
        document.querySelectorAll('.color-select .color-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        element.classList.add('selected');
        document.getElementById('goalColor').value = color;
    }
};
