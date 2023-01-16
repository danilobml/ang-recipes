import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs';

import { RecipeService } from '../recipe-book/recipes.service';
import { Recipe } from '../recipe-book/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipesData() {
    const recipeList = this.recipeService.getRecipes();
    return this.http.put(
      'https://recipes-ng-dbml-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipeList
    );
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
