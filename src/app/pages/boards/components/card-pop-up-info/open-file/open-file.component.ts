import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FileInterface} from "../../../../../interfaces/file.interface";

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss']
})
export class OpenFileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public file: FileInterface) { }

  ngOnInit(): void {
  }
}
