import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {
  confirmSelection:string
  imagePath: any;
  url: string | ArrayBuffer;

//   private filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));

//   public demoForm = new FormGroup({
//     files: this.filesControl
// });

  // @ViewChild('demoForm') public demoForm: FileBrowserComponent;

  constructor() { }

  ngOnInit(): void {
  }
  isDisabled:boolean = false;

  public uploadedFiles: Array<File> = [];
  @Output() searchresult = new EventEmitter();

  // public clear(): void {
  //       this.uploadedFiles = [];
  //   }

    // show(){
    //   const mimeType = this.uploadedFiles[0].type;
    //   console.log(mimeType);
    //   // if (mimeType.match(/image\/*/) == null) {
    //   //   this.message = "Only images are supported.";
    //   //   return;
    //   // }
    //   console.log(this.uploadedFiles);
    //   const reader = new FileReader();
    //   this.imagePath = this.uploadedFiles;
    //   reader.readAsDataURL(this.uploadedFiles[0]); 
    //   reader.onload = (_event) => { 
    //     this.url = reader.result; 
    //   }
    // }

    confirm(){
      this.confirmSelection = "Media Confirmed";
      this.searchresult.emit(this.uploadedFiles);
      
    }

    checkFiles(){
      console.log(this.uploadedFiles);
    }

    refreshChild() {
      this.ngOnInit();
      this.clear();
      this.uploadedFiles = [];
    }

    public fileUploadControl = new FileUploadControl(null, FileUploadValidators.fileSize(80000));

    public toggleStatus() {
        this.fileUploadControl.disable(!this.fileUploadControl.disabled);
    }

    public toggleListVisibility() {
        this.fileUploadControl.setListVisibility(!this.fileUploadControl.isListVisible);
    }

    public toggleMultiple() {
        this.fileUploadControl.multiple(!this.fileUploadControl.isMultiple);
    }

    public clear(): void {
        this.fileUploadControl.clear();
    }
}
