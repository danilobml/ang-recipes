import { Component, EventEmitter, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipeToDisplay:Recipe

  constructor(private recipesService: RecipeService) {}

  onSendToSL(recipe:Recipe):void {
    this.recipesService.sendIngredientsToList(recipe.ingredients)
  }
}
