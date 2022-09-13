export class filterRange {
  rangeSlider(
    inputSlider: NodeList,
    inputNumber: NodeList,
    progress: HTMLElement
  ): void {
    inputNumber.forEach((input) => {
      inputSlider.forEach((input) => {
        input.addEventListener("input", (event) => {
          const minValue = (inputSlider[0] as HTMLInputElement).value;
          const maxValue = (inputSlider[1] as HTMLInputElement).value;
          if (+maxValue - +minValue < 5) {
            if ((event.target as HTMLElement).className === "range-min") {
              (inputSlider[0] as HTMLInputElement).value = String(
                +maxValue - 5
              );
            } else {
              (inputSlider[1] as HTMLInputElement).value = String(
                5 + +minValue
              );
            }
          } else {
            (inputNumber[0] as HTMLInputElement).value = minValue;
            (inputNumber[1] as HTMLInputElement).value = maxValue;
            progress.style.left =
              (+minValue - +(inputSlider[0] as HTMLInputElement).min) /
                ((+(inputSlider[0] as HTMLInputElement).max -
                  +(inputSlider[0] as HTMLInputElement).min) /
                  100) +
              "%";
            progress.style.right =
              (+(inputSlider[1] as HTMLInputElement).max - +maxValue) /
                ((+(inputSlider[1] as HTMLInputElement).max -
                  +(inputSlider[1] as HTMLInputElement).min) /
                  100) +
              "%";
          }
        });
      });
      input.addEventListener("input", (event: Event) => {
        let minValue = (inputNumber[0] as HTMLInputElement).value;
        let maxValue = (inputNumber[1] as HTMLInputElement).value;

        if (minValue < (inputSlider[0] as HTMLInputElement).min) {
          minValue = (inputSlider[0] as HTMLInputElement).min;
        }
        if (
          maxValue > (inputSlider[1] as HTMLInputElement).max ||
          maxValue < (inputSlider[0] as HTMLInputElement).min
        ) {
          maxValue = (inputSlider[1] as HTMLInputElement).max;
        }
        if (
          +maxValue - +minValue >= 5 &&
          +maxValue <= +(inputSlider[1] as HTMLInputElement).max &&
          +minValue >= +(inputSlider[1] as HTMLInputElement).min
        ) {
          if ((event.target as HTMLElement).className === "input input-min") {
            (inputSlider[0] as HTMLInputElement).value = minValue;
            progress.style.left =
              (+minValue - +(inputSlider[0] as HTMLInputElement).min) /
                ((+(inputSlider[0] as HTMLInputElement).max -
                  +(inputSlider[0] as HTMLInputElement).min) /
                  100) +
              "%";
          } else {
            (inputSlider[1] as HTMLInputElement).value = maxValue;
            progress.style.right =
              (+(inputSlider[1] as HTMLInputElement).max - +maxValue) /
                ((+(inputSlider[1] as HTMLInputElement).max -
                  +(inputSlider[1] as HTMLInputElement).min) /
                  100) +
              "%";
          }
        }
      });
    });
  }
}
