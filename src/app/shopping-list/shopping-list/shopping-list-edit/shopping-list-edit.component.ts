import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../../shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') formSl: NgForm
  subscription: Subscription
  editMode = false
  editedIndex:number
  ingredientToEdit: Ingredient

  constructor(private shoppingservice: ShoppingService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingservice.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true
        this.editedIndex = index
        this.ingredientToEdit = this.shoppingservice.getIngredient(index)
        this.formSl.setValue({
          name: this.ingredientToEdit.name,
          amount: this.ingredientToEdit.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(form: NgForm):void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount)
    if(this.editMode) {
      this.shoppingservice.updateIngredient(this.editedIndex, newIngredient)
      this.editMode = false
      this.formSl.reset()
    } else {
      this.shoppingservice.addIngredient(newIngredient)
      this.formSl.reset()
    }
  }

  onClear() {
    this.editMode = false
    this.formSl.reset()
  }

  onDelete() {
      this.shoppingservice.deleteIngredient(this.editedIndex)
      this.onClear()
  }
}
