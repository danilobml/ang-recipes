import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.model';
import { ShoppingService } from '../../shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', {static: true}) nameInputRef:ElementRef
  @ViewChild('amountInput', {static: true}) amountInputRef:ElementRef

  constructor(private shoppingservice: ShoppingService) {}

  onAddItem():void{
    this.shoppingservice.addIngredient({
      name: this.nameInputRef.nativeElement.value,
      amount: this.amountInputRef.nativeElement.value
    })
  }
}
