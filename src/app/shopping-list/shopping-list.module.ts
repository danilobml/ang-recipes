import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [CommonModule, FormsModule],
})
export class ShoppingListModule {}
