import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss']
})
export class OpenFileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public file: any) { }

  ngOnInit(): void {
    console.log(this.file, 'filefilefile')
  }

}
