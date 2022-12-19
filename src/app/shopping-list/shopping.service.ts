import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'})
export class ShoppingService {
  startedEditing = new Subject<number>
  ingredientsChanged = new Subject<Ingredient[]>()
  private ingredients:Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomato', 10)
  ]

  getIngredients():Ingredient[] {
    return this.ingredients.slice()
  }

  addIngredient(ingredient:Ingredient):void {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]):void {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(ingredients.slice())
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index]
  }

  updateIngredient(index: number, newInredient: Ingredient) {
    this.ingredients[index] = newInredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index,1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
