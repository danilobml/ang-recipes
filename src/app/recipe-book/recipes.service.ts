import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeSelected = new Subject<Recipe>()
  ingredientsToList: Ingredient[]
  recipesChanged = new Subject<Recipe[]>

  private recipes: Recipe[] = [new Recipe('Yogplants', 'Stuffed eggplants with youghurt and salad', 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80', [{name:'yogurt', amount: 200}, {name:'eggplant', amount: 2}, {name:'vegetables', amount: 150}]),
                      new Recipe('Autumn soup', 'Delicious pumpkin and cream soup', 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80', [{name:'pumpkin', amount: 1}, {name:'sour-cream', amount: 200}, {name:'cheese', amount: 100}, {name:'pumpkin-seeds', amount: 50}])]

  constructor(private shoppingService: ShoppingService) {}

  getRecipes():Recipe[] {
    return this.recipes.slice()
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id]
  }

  sendIngredientsToList(ingredients:Ingredient[]):void {
   this.shoppingService.addIngredients(ingredients)
  }

  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
    console.log(this.recipes)
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }
}
