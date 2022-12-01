import { Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() show = new EventEmitter<string>()

  onClickNav(page:string):void{
    this.show.emit(page)
  }
}
