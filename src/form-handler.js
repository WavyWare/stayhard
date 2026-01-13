const FormHandler = {
    editingGoalId: null,
    init() {
        document.getElementById('addGoalForm').innerHTML = FormBuilder.buildAddGoalForm();
        document.getElementById('addGoalForm').addEventListener('submit', (e) => this.handleAddGoal(e));
        document.getElementById('editGoalForm').addEventListener('submit', (e) => this.handleEditGoal(e));
    },
    handleAddGoal(e) {
        e.preventDefault();
        const name = document.getElementById('goalName').value;
        const type = document.getElementById('goalType').value;
        const unit = document.getElementById('goalUnit').value || '';
        const color = document.getElementById('goalColor').value;
        if (!name || !type) return;
        GoalsManager.addGoal(name, type, unit, color);
        document.getElementById('addGoalForm').innerHTML = FormBuilder.buildAddGoalForm();
        UIController.refreshUI();
    },
    handleEditGoal(e) {
        e.preventDefault();
        const name = document.getElementById('editGoalName').value;
        const unit = document.getElementById('editGoalUnit')?.value || '';
        GoalsManager.updateGoal(this.editingGoalId, name, unit);
        this.closeEditModal();
        UIController.refreshUI();
    },
    openEditModal(goalId) {
        const goal = GoalsManager.goals.find(g => g.id === goalId);
        if (!goal) return;
        this.editingGoalId = goalId;
        document.getElementById('editGoalForm').innerHTML = FormBuilder.buildEditGoalForm(goal);
        document.getElementById('editModal').classList.add('active');
    },
    closeEditModal() {
        document.getElementById('editModal').classList.remove('active');
    }
};
function closeEditModal() {
    FormHandler.closeEditModal();
}
window.addEventListener('DOMContentLoaded', () => FormHandler.init());
