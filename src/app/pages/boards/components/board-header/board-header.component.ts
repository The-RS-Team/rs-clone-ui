import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BoardInterface} from "../../../../interfaces/board.interface";
import {Messages} from "../../../../app.constants";
import {BoardsService} from "../../boards.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
    @ViewChild('menuWrapper') menuWrapper: ElementRef | undefined;
    @Input() boardWrapper: HTMLElement | undefined;
    @Input() board: BoardInterface | undefined;

    private sub$ = new Subscription();
    public menu: HTMLElement | undefined;
    public isMenuOpen = false;
    public isSubMenu = false;
    public isInvite = false;
    public settings = '';
    public boardTitleInput = new FormControl();
    public formGroup: FormGroup | any;

    constructor(private boardsService: BoardsService,
                private fb: FormBuilder) {
    }


    ngOnInit(): void {
        this.sub$.add(
            this.boardTitleInput?.valueChanges.subscribe((changes) => {
                    this.changeBoardTitle(changes);
            })
        )
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
            const board = {
                id: this.board.id,
                title: value,
                description: this.board.description,
                isFavorite: this.board.isFavorite,
                background: this.board.background,
            }

            this.boardsService.updateBoard(board).subscribe(item => this.board = board)
        }
    }
    // public changeBoardTitle(value: string) {
    //     if (this.board) {
    //         const item = {
    //             id: this.board.id,
    //             title: value,
    //         }
    //         this.boardsService.updateBoard(item as BoardInterface).subscribe(item => console.log('ddd'))
    //     }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }

}
