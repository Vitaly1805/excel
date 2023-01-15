export class TableSelection {
  static classSelectCell = '_selected'
  static classActiveCell = '_active'

  constructor() {
    this.$cells = []
  }

  select($cell) {
    if (this.$cells.length > 0) {
      this.clearSelected()
      this.clearActive()
    }

    this.setActive($cell)
    this.$cells.push(this.$currentCell)
  }

  selectCtrlGroup($cell) {
    this.$currentCell.classList.add(TableSelection.classSelectCell)
    this.clearActive()
    this.setActive($cell)
    this.$cells.push($cell)
  }

  selectShiftGroup($cells) {
    this.clearSelected()
    this.$cells = $cells
    this.$cells.forEach($cell => $cell.classList.add(TableSelection.classSelectCell))
  }

  clearSelected() {
    this.$cells.forEach($cell => $cell.classList.remove(TableSelection.classSelectCell))
    this.$cells = []
  }

  clearActive() {
    this.$currentCell.classList.remove(TableSelection.classActiveCell)
    this.$currentCell = null
  }

  setActive($cell) {
    this.$currentCell = $cell
    this.setFocus()
    this.$currentCell.classList.add(TableSelection.classActiveCell)
  }

  setFocus() {
    const [range, selection] = [new Range(), document.getSelection()];
    range.selectNodeContents(this.$currentCell);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    this.$currentCell.focus()
  }
}
