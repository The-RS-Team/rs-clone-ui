import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BoardInterface} from "../../../../interfaces/board.interface";
import {Messages} from "../../../../app.constants";
import {BoardsService} from "../../boards.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-board-header',
    templateUrl: './board-header.component.html',
    styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
    @ViewChild('menuWrapper') menuWrapper: ElementRef | undefined;
    @Input() boardWrapper: HTMLElement | undefined;
    @Input() board: BoardInterface | undefined;

    public menu: HTMLElement | undefined;
    public isMenuOpen = false;
    public isSubMenu = false;
    public settings = '';
    boardTitleInput = new FormControl();

    private sub$ = new Subscription();

    constructor(private boardsService: BoardsService) {
    }


    ngOnInit(): void {
        this.sub$.add(
            this.boardTitleInput?.valueChanges.subscribe((changes) => {
                    this.changeBoardTitle(changes);
            })
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

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }

}
