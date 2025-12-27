function createExpenseStore(initialExpenses = []) {
  const expenses = [...initialExpenses];

  function add(expense) {
    expenses.push(expense);
  }

  function getAll() {
    return [...expenses];
  }

  function removeById(id) {
    const index = expenses.findIndex((e) => e.id === id);
    //The findIndex() method returns the index of the
    // first item for which callback returned true.

    if (index === -1) {
      return false;
    }

    expenses.splice(index, 1);
    // The number of elements to remove.
    // Splice() removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements
    return true;
  }

  return { add, getAll, removeById };
}

module.exports = { createExpenseStore };
