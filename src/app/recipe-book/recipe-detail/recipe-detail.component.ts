import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeToDisplay:Recipe
  recipeId: number

  constructor(private recipesService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params.id
        this.recipeToDisplay = this.recipesService.getRecipes()[this.recipeId]
      }
    )
  }

  onSendToSL(recipe:Recipe):void {
    this.recipesService.sendIngredientsToList(recipe.ingredients)
  }
}
