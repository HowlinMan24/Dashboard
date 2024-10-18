import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  smallCells = ['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4'];
  largeCells = ['Cell 5', 'Cell 6', 'Cell 7'];

  file: File;


  onUpload(event) {
    const file: File = event.target.files[0];
    if (file) {
      alert("It is of type file")
      console.log(file);
    } else {
      alert("It is not of type file")
    }
  }
}
