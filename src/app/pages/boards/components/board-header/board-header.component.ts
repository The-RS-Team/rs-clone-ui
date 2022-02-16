import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Board } from './../../../../models/board';
import { Subscription } from 'rxjs';
import { BoardInterface } from './../../../../interfaces/board.interface';
import { BoardsComponent } from './../boards/boards.component';
import { BoardsService } from './../../boards.service';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  private sub$ = new Subscription();
  menu: HTMLElement | undefined;
  isMenuOpen = false;
  isSubMenu = false;
  isInvite = false;
  settings = '';
  public formGroup: FormGroup | any;

  constructor(private fb: FormBuilder,
              private boardsService: BoardsService) { }

  @ViewChild('menuWrapper') menuWrapper: ElementRef | undefined;

  @Input()
  boardWrapper: HTMLElement | undefined;

  @Input() public board!: Board;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
  });
  }

  addToFavorites() {
    this.board.isFavorite = !this.board.isFavorite;
    console.log(this.board)

    this.boardsService.updateBoard({
      id: this.board.id,
      isFavorite: this.board.isFavorite,
      
    } as BoardInterface)
            .subscribe(
                resp => {}
            )
  }

  ngAfterViewInit(): void {
    this.menu = this.menuWrapper?.nativeElement;
  }

  openMenu() {
    this.menu!.className = 'menu opened';
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.menu!.className = 'menu';
    this.isMenuOpen = false;
  }

  openSettings(key: string) {
    this.isSubMenu = true;
    switch (key) {
      case 'bg':
        this.settings = 'bg';
        break;
    }
  }

  openInvite() {
    this.isInvite = true;
  }

  closeInvite() {
    this.isInvite = false;
  }

  sendInvite() {
    if (this.formGroup.invalid) return;
  }

  goBack(path: string) {
    this.settings = path;
  }

  public changeBoardTitle(value: string) {
    if (this.board) {
        const item = {
            id: this.board.id,
            title: value,
        }
        this.boardsService.updateBoard(item as BoardInterface).subscribe(item => console.log('ddd'))
    }
}

}
