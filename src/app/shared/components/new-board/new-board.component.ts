import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {
  public formGroup: FormGroup | any;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<NewBoardComponent>) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

  create() {
    if (this.formGroup.invalid) return;
    this.dialogRef.close(this.formGroup.value);
  }

}
