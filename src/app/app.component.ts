import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wonder Recipes';
  showPage:string="recipes"

  onNavClicked(show:string):void{
    this.showPage = show
  }
}
