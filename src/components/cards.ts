import { saleItem } from "../types/index";
export class Cards {
  public cardsDraw(data: Array<saleItem>): void {
    const mainItems = document.querySelector(".main-items") as HTMLElement;
    mainItems.innerHTML = `<div class="text-attantion">Sorry, but don\`t have matches</div>`;
    data.forEach((item) => {
      const itemContainer = document.createElement("div") as HTMLElement;
      itemContainer.classList.add("main-item");
      itemContainer.innerHTML = `
                              <h2 class="item__title">${item.title}</h2>
                              <img class="item__image" src="${item.imageURL}" alt="TVimage">
                              <p class="item__brand">Brand: ${item.brand}</p>                            
                              <p class="item__size">Size: ${item.size}"</p>                            
                              <p class="item__year">Year: ${item.year}</p>                            
                              <p class="item__color">Color: ${item.color}</p>                            
                              <p class="item__count">Count: ${item.count}</p>
                              <div class="item__price">${item.price}$</div>
                              <img class="item__basket" src="./assets/svg/itemsupermarket.svg" alt="basket">
          `;
      mainItems.append(itemContainer);
    });
  }
}
