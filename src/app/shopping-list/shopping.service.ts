import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingService {
  ingredientsChanged = new EventEmitter<Ingredient[]>()
  private ingredients:Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomato', 10)
  ]

  getIngredients():Ingredient[] {
    return this.ingredients.slice()
  }

  addIngredient(ingredient:Ingredient):void {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]):void {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(ingredients.slice())
  }
}
