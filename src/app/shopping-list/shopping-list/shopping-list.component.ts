import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipe-book/recipes.service';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[];

  constructor(private shoppingService: ShoppingService, private recipeService: RecipeService) {
    this.shoppingService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=> {
        this.ingredients = ingredients
      }
    )
  }

  ngOnInit():void {
    this.ingredients = this.shoppingService.getIngredients()
  }
}
