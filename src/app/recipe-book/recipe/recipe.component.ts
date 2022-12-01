import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  recipeToDisplay:Recipe;

  onSelectedRecipe(recipe:Recipe){
    this.recipeToDisplay = recipe
    console.log(this.recipeToDisplay)
  }
}
