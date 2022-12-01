import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', {static: true}) nameInputRef:ElementRef
  @ViewChild('amountInput', {static: true}) amountInputRef:ElementRef
  @Output() newIngredient = new EventEmitter<Ingredient>()

  onAddItem():void{
    this.newIngredient.emit({
      name: this.nameInputRef.nativeElement.value,
      amount: this.amountInputRef.nativeElement.value
    })
  }
}
