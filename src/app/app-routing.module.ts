import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";

import { RecipeComponent } from "./recipe-book/recipe/recipe.component";
import { SelectRecipeComponent } from "./recipe-book/select-recipe/select-recipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list/shopping-list.component";

const appRoutes:Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'recipes', component: RecipeComponent, children: [
    {path: '', component: SelectRecipeComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent}
  ]},
  // {path: '**', redirectTo: '/recipes'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule {}
