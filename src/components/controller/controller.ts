import { callbackAny, saleItem, FilterSets } from "../../types/index";
import { saleItems, filterSets } from "../dataStorage";
import { filterRange } from "./filterRange";
export class Conteroller extends filterRange {
  public getStart(callback: callbackAny<Array<saleItem>>): void {
    const sets = localStorage.getItem("sets");
    if (sets) Object.assign(filterSets, JSON.parse(sets as string));
    this.loadPage(filterSets, callback);
  }
  public filterSaleItems(sets: FilterSets): Array<saleItem> {
    let cloneSaleItems: Array<saleItem> = saleItems;
    if (sets.brand?.length)
      cloneSaleItems = cloneSaleItems.filter((elem) =>
        sets.brand?.includes(elem.brand?.toLowerCase() as string)
      );
    if (sets.year?.length)
      cloneSaleItems = cloneSaleItems.filter((elem) =>
        sets.year?.includes(elem.year as string)
      );
    if (sets.color?.length)
      cloneSaleItems = cloneSaleItems.filter((elem) =>
        sets.color?.includes(elem.color?.toLowerCase() as string)
      );
    cloneSaleItems = cloneSaleItems.filter((elem) => {
      return (
        +sets.inchMin <= +(elem.size as string) &&
        +sets.inchMax >= +(elem.size as string)
      );
    });
    cloneSaleItems = cloneSaleItems.filter((elem) => {
      return (
        +sets.priceMin <= +(elem.price as string) &&
        +sets.priceMax >= +(elem.price as string)
      );
    });
    return cloneSaleItems;
  }
  public filterValue(
    event: Event,
    callback: callbackAny<Array<saleItem>>
  ): void {
    const e = event.target as HTMLElement;
    const text: string = e.innerText.toLowerCase();
    e.classList.toggle("active-btnValue");
    if (e.classList.contains("active-btnValue")) {
      if (e.classList.contains("brand-button")) {
        filterSets.brand?.push(text);
      }
      if (e.classList.contains("year-button")) {
        filterSets.year?.push(text);
      }
      if (e.classList.contains("color-button")) {
        filterSets.color?.push(text);
      }
    } else {
      if (e.classList.contains("brand-button")) {
        filterSets.brand?.splice(filterSets.brand?.indexOf(text), 1);
      }
      if (e.classList.contains("year-button")) {
        filterSets.year?.splice(filterSets.year?.indexOf(text), 1);
      }
      if (e.classList.contains("color-button")) {
        filterSets.color?.splice(filterSets.color?.indexOf(text), 1);
      }
    }
    this.loadPage(filterSets, callback);
  }
  public filterRange(
    event: Event,
    callback: callbackAny<Array<saleItem>>
  ): void {
    const inchInputSlider = document.querySelectorAll(
      ".inch-input-slider input"
    ) as NodeList;
    const inchInput = document.querySelectorAll(
      ".filter-range__inch .input"
    ) as NodeList;
    const inchProgress = document.querySelector(
      ".inch-input-slider .progress"
    ) as HTMLElement;
    const pricehInputSlider = document.querySelectorAll(
      ".price-input-slider input"
    ) as NodeList;
    const priceInput = document.querySelectorAll(
      ".filter-range__price .input"
    ) as NodeList;
    const priceProgress = document.querySelector(
      ".price-input-slider .progress"
    ) as HTMLElement;
    const e = event.target as HTMLElement;
    if (e.dataset.input === "inch") {
      super.rangeSlider(inchInputSlider, inchInput, inchProgress);
      if (e.classList.contains("range-min")) {
        filterSets.inchMin = (e as HTMLInputElement).value;
      }
      if (e.classList.contains("range-max")) {
        filterSets.inchMax = (e as HTMLInputElement).value;
      }

      if (e.classList.contains("input-min")) {
        filterSets.inchMin = (e as HTMLInputElement).value;
      }
      if (e.classList.contains("input-max")) {
        filterSets.inchMax = (e as HTMLInputElement).value;
      }
    }
    if (e.dataset.input === "price") {
      super.rangeSlider(pricehInputSlider, priceInput, priceProgress);
      if (e.classList.contains("range-min")) {
        filterSets.priceMin = (e as HTMLInputElement).value;
      }
      if (e.classList.contains("range-max")) {
        filterSets.priceMax = (e as HTMLInputElement).value;
      }

      if (e.classList.contains("input-min")) {
        filterSets.priceMin = (e as HTMLInputElement).value;
      }
      if (e.classList.contains("input-max")) {
        filterSets.priceMax = (e as HTMLInputElement).value;
      }
    }
    this.loadPage(filterSets, callback);
  }
  public filterSorts(
    event: Event,
    callback: callbackAny<Array<saleItem>>
  ): void {
    const e = event.target as HTMLInputElement;
    filterSets.sorts = e.value;
    this.sorts(filterSets, callback);
  }
  public sorts(sets: FilterSets, callback: callbackAny<Array<saleItem>>): void {
    const newdata: Array<saleItem> = this.filterSaleItems(sets);
    if (sets.sorts === "titleaz") {
      newdata.sort((a: saleItem, b: saleItem) =>
        (a.title as string) < (b.title as string) ? -1 : 1
      );
    }
    if (sets.sorts === "titleza") {
      newdata.sort((a: saleItem, b: saleItem) =>
        (a.title as string) > (b.title as string) ? -1 : 1
      );
    }
    if (sets.sorts === "yearup") {
      newdata.sort(
        (a: saleItem, b: saleItem) => +(a.year as string) - +(b.year as string)
      );
    }
    if (sets.sorts === "yeardown") {
      newdata.sort(
        (a: saleItem, b: saleItem) => +(b.year as string) - +(a.year as string)
      );
    }
    callback(newdata);
  }
  public searchCards(): void {
    const itemTitles = document.querySelectorAll(".item__title") as NodeList;
    const mainItem = document.querySelectorAll(".main-item") as NodeList;
    const textAttantion = document.querySelector(
      ".text-attantion"
    ) as HTMLElement;
    const search = document.querySelector(
      ".search-header__input"
    ) as HTMLElement;
    search.addEventListener("search", () => {
      textAttantion.style.display = "none";
    });
    textAttantion.style.display = "none";
    const s = search as HTMLInputElement;
    const text = s.value.trim().toLowerCase();
    if (text !== "") {
      itemTitles.forEach((elem) => {
        const a = elem as HTMLElement;
        const b = elem.parentElement as HTMLElement;
        if ((a.textContent as string).toLowerCase().search(text) === -1) {
          b.classList.add("hide");
        } else {
          b.classList.remove("hide");
        }
      });
      let count = 0;
      mainItem.forEach((elem) => {
        const a = elem as HTMLElement;
        if (!a.classList.contains("hide")) {
          count++;
        }
      });
      count === 0
        ? (textAttantion.style.display = "block")
        : (textAttantion.style.display = "none");
    } else {
      itemTitles.forEach((elem) => {
        const b = elem.parentElement as HTMLElement;
        b.classList.remove("hide");
      });
    }
  }
  public resetFilters(callback: callbackAny<Array<saleItem>>): void {
    filterSets.brand = [];
    filterSets.year = [];
    filterSets.color = [];
    filterSets.inchMin = "32";
    filterSets.inchMax = "85";
    filterSets.priceMin = "100";
    filterSets.priceMax = "10000";
    const btnValue = document.querySelectorAll(".btn") as NodeList;
    btnValue.forEach((elem) =>
      (elem as HTMLElement).classList.remove("active-btnValue")
    );
    this.loadPage(filterSets, callback);
  }
  public rebutFilters(callback: callbackAny<Array<saleItem>>): void {
    filterSets.brand = [];
    filterSets.year = [];
    filterSets.color = [];
    filterSets.inchMin = "32";
    filterSets.inchMax = "85";
    filterSets.priceMin = "100";
    filterSets.priceMax = "10000";
    filterSets.sorts = "titleaz";
    filterSets.title = [];
    filterSets.count = 0;
    const btnValue = document.querySelectorAll(".btn") as NodeList;
    btnValue.forEach((elem) =>
      (elem as HTMLElement).classList.remove("active-btnValue")
    );
    this.loadPage(filterSets, callback);
    const headerBasket = document.querySelector(
      ".header__basket span"
    ) as HTMLElement;
    headerBasket.innerHTML = "0";
    const sortSelect = document.querySelector(
      ".filter-sorts__select"
    ) as HTMLElement;
    (sortSelect as HTMLInputElement).value = "titleaz";
  }
  public beforeUnload(): void {
    localStorage.setItem("sets", JSON.stringify(filterSets));
  }
  public loadPage(
    data: FilterSets,
    callback: callbackAny<Array<saleItem>>
  ): void {
    const rangeInch = document.querySelectorAll(".filter-range__inch input");
    const progressInch = document.querySelector(
      ".inch-input-slider .progress"
    ) as HTMLElement;
    progressInch.style.left = (+data.inchMin - 32) / 0.53 + "%";
    progressInch.style.right = (85 - +data.inchMax) / 0.53 + "%";
    (rangeInch[0] as HTMLInputElement).value = data.inchMin;
    (rangeInch[1] as HTMLInputElement).value = data.inchMin;
    (rangeInch[2] as HTMLInputElement).value = data.inchMax;
    (rangeInch[3] as HTMLInputElement).value = data.inchMax;
    const rangePrice = document.querySelectorAll(".filter-range__price input");
    const progressPrice = document.querySelector(
      ".price-input-slider .progress"
    ) as HTMLElement;
    progressPrice.style.left = (+data.priceMin - 100) / 99 + "%";
    progressPrice.style.right = (10000 - +data.priceMax) / 99 + "%";
    (rangePrice[0] as HTMLInputElement).value = data.priceMin;
    (rangePrice[1] as HTMLInputElement).value = data.priceMin;
    (rangePrice[2] as HTMLInputElement).value = data.priceMax;
    (rangePrice[3] as HTMLInputElement).value = data.priceMax;
    const btnValue = document.querySelectorAll(".btn") as NodeList;
    btnValue.forEach((elem) => {
      (data.brand as Array<string>).includes(
        (elem as HTMLElement).innerText.toLowerCase()
      ) ||
      (data.year as Array<string>).includes(
        (elem as HTMLElement).innerText.toLowerCase()
      ) ||
      (data.color as Array<string>).includes(
        (elem as HTMLElement).innerText.toLowerCase()
      )
        ? (elem as HTMLElement).classList.add("active-btnValue")
        : (elem as HTMLElement).classList.remove("active-btnValue");
    });
    const sortSelect = document.querySelector(
      ".filter-sorts__select"
    ) as HTMLElement;
    (sortSelect as HTMLInputElement).value = data.sorts as string;
    const card = this.filterSaleItems(data);
    data.sorts ? this.sorts(data, callback) : callback(card);
    const basketbtn = document.querySelectorAll(".item__basket") as NodeList;
    basketbtn.forEach((elem) => {
      (data.title as Array<string>).includes(
        ((elem as HTMLElement).dataset.title as string).toLowerCase()
      )
        ? (elem as HTMLElement).classList.add("active-item-backet")
        : (elem as HTMLElement).classList.remove("active-btnValue");
    });
    const headerBasket = document.querySelector(
      ".header__basket span"
    ) as HTMLElement;
    headerBasket.innerText = String(data.count);
  }
  public addBusket(): void {
    const mainItems = document.querySelector(".main-items") as HTMLElement;
    const popap = document.querySelector(".popap-container") as HTMLElement;
    const headerBasket = document.querySelector(
      ".header__basket span"
    ) as HTMLElement;
    mainItems.addEventListener("click", (event: Event): void => {
      const a = event.target as HTMLElement;
      if (a.classList.contains("item__basket")) {
        if (a.classList.contains("active-item-backet")) {
          filterSets.count--;
          filterSets.title?.splice(
            filterSets.title?.indexOf(a.getAttribute("title") as string),
            1
          );
          a.classList.remove("active-item-backet");
          headerBasket.innerText = String(+headerBasket.innerText - 1);
        } else {
          if (headerBasket.innerText === "5") {
            popap.style.display = "block";
            popap.addEventListener("click", () => {
              popap.style.display = "none";
            });
          } else {
            filterSets.count++;
            filterSets.title?.push(a.dataset.title?.toLowerCase() as string);
            a.classList.add("active-item-backet");
            headerBasket.innerText = String(+headerBasket.innerText + 1);
          }
        }
      }
    });
  }
}
