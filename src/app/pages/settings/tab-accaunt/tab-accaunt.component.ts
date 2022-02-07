import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tab-accaunt',
  templateUrl: './tab-accaunt.component.html',
  styleUrls: ['./tab-accaunt.component.scss']
})
export class TabAccauntComponent implements OnInit {
  public formGroup: FormGroup | any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nickname: ['', []],
    });
  }

}
