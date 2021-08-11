import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewComponent implements OnInit {
  post: any;

  constructor(public dialogRef: MatDialogRef<PostViewComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  

  ngOnInit(): void {
    this.post = this.data.postData;
    console.log(this.post);
  }

}
