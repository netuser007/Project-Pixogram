import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-display',
  templateUrl: './popup-display.component.html',
  styleUrls: ['./popup-display.component.scss']
})
export class PopupDisplayComponent implements OnInit {
  message: any;
  color: any;

  constructor(public dialogRef: MatDialogRef<PopupDisplayComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.message = this.data.message;
    this.color = this.data.color;
  }

}
