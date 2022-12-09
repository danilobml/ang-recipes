import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipeToDisplay:Recipe;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe:Recipe) => {
        this.recipeToDisplay = recipe
      }
    )
  }

  onSelectedRecipe(recipe:Recipe){
    this.router.navigate([recipe])
    console.log(this.recipeToDisplay)
  }
}
