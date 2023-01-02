import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipe-book/recipes.service';
import { Recipe } from '../recipe-book/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipesData() {
    const recipeList = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipes-ng-dbml-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipeList
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipesData() {
    return this.http
      .get<Recipe[]>(
        'https://recipes-ng-dbml-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
