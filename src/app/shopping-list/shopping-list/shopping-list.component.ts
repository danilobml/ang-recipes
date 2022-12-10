import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecipeService } from 'src/app/recipe-book/recipes.service';
import { ShoppingService } from '../shopping.service';
import { Ingredient } from '../../shared/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  ingredientsSubscription: Subscription

  constructor(private shoppingService: ShoppingService, private recipeService: RecipeService) {
    this.ingredientsSubscription = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=> {
        this.ingredients = ingredients
      }
    )
  }

  ngOnInit():void {
    this.ingredients = this.shoppingService.getIngredients()
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe()
  }
}
