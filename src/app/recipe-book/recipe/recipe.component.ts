import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipeToDisplay:Recipe;
  subscriptionRecipe: Subscription

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptionRecipe = this.recipeService.recipeSelected.subscribe(
      (recipe:Recipe) => {
        this.recipeToDisplay = recipe
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptionRecipe.unsubscribe()
  }

  onSelectedRecipe(recipe:Recipe){
    this.router.navigate([recipe])
    console.log(this.recipeToDisplay)
  }
}
