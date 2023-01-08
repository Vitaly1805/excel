import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent {
  static className = 'header'

  getHTML() {
    return ` 
      <div class="header">
        <div class="header__body">
          <input type="text" class="header__input" value="Новая таблица">
          <div class="header__icons">
            <span class="material-symbols-outlined">
              delete
            </span> 
            <span class="material-symbols-outlined">
              exit_to_app
            </span>
          </div>
        </div>
    </div>`
  }
}

