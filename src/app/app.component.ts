import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'platy-syner-etsy-orders';
  mActiveId = 'import';

  test(e){
    console.log(e)
  }
}
