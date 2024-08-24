import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "decimal",
})
export class DecimalPipe implements PipeTransform {
  transform(value: number, decimalPlaces: number = 1): string {
    return value.toFixed(decimalPlaces);
  }
}
