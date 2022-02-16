import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BoardInterface} from "../../../../interfaces/board.interface";
import {Messages} from "../../../../app.constants";
import {BoardsService} from "../../boards.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-board-header',
    templateUrl: './board-header.component.html',
    styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
    menu: HTMLElement | undefined;
    isMenuOpen = false;
    isSubMenu = false;
    settings = '';

    constructor(private boardsService: BoardsService) {
    }

    @ViewChild('menuWrapper') menuWrapper: ElementRef | undefined;

    @Input() boardWrapper: HTMLElement | undefined;
    @Input() board: BoardInterface | undefined;

    private sub$ = new Subscription();


    ngOnInit(): void {
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
            const item = {
                id: this.board.id,
                title: value,
                description: this.board.description,
                isFavorite: this.board.isFavorite,
                background: this.board.background,
                columns: this.board.columns,
            }
            this.boardsService.updateBoard(item).subscribe(item => console.log('ddd'))
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }

}
