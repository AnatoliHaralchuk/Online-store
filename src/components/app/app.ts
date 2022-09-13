import { Conteroller } from "../controller/controller";
import { AppView } from "../view/appView";
export class App {
  private controller: Conteroller;
  private view: AppView;
  constructor() {
    this.controller = new Conteroller();
    this.view = new AppView();
  }
  public start(): void {
    const btnValue = document.querySelectorAll(".btn") as NodeList;
    btnValue.forEach((elem) =>
      elem.addEventListener("click", (event) =>
        this.controller.filterValue(event, (data) => this.view.cardsDraw(data))
      )
    );
    const filterRange = document.querySelector(".main-sets__filter-range");
    filterRange?.addEventListener("input", (event) =>
      this.controller.filterRange(event, (data) => this.view.cardsDraw(data))
    );
    const filterSortsSelect = document.querySelector(".filter-sorts__select");
    filterSortsSelect?.addEventListener("change", (event) =>
      this.controller.filterSorts(event, (data) => this.view.cardsDraw(data))
    );
    const search = document.querySelector(
      ".search-header__input"
    ) as HTMLElement;
    search.addEventListener("input", this.controller.searchCards);
    const reset = document.querySelector(".btn-reset") as HTMLElement;
    reset.addEventListener("click", () =>
      this.controller.resetFilters((data) => this.view.cardsDraw(data))
    );
    const rebut = document.querySelector(".btn-rebut") as HTMLElement;
    rebut.addEventListener("click", () =>
      this.controller.rebutFilters((data) => this.view.cardsDraw(data))
    );
    window.addEventListener("beforeunload", () =>
      this.controller.beforeUnload()
    );
    this.controller.addBusket();
    this.controller.getStart((data) => this.view.cardsDraw(data));
  }
}
