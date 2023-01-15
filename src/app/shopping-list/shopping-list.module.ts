import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SharedModule } from './../shared/shared.module';
@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [FormsModule, SharedModule],
})
export class ShoppingListModule {}
