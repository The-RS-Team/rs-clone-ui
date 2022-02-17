import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BoardInterface} from '../../../../interfaces/board.interface';
import {BoardsService} from '../../boards.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {WebsocketService} from '../../../../shared/services/socket.service';
import {Messages} from '../../../../app.constants';
import {Invite} from '../../../../models/invite';

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

    constructor(private readonly boardsService: BoardsService,
                private readonly socketService: WebsocketService,
                private readonly fb: FormBuilder) {
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
        this.socketService.on(Messages.newInvite, this.newInviteCallback.bind(this));
    }

    addToFavorites() {
        if (!this.board) return;
        this.board.isFavorite = !this.board?.isFavorite;
        console.log(this.board)

        this.boardsService.updateBoard({
            id: this.board.id,
            isFavorite: this.board.isFavorite,

        } as BoardInterface)
            .subscribe(
                resp => {
                }
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

    newInviteCallback(invite: Invite): void {
        console.log('newInviteCallback', invite)

    }

    sendInvite(email: string) {
        if (this.formGroup.invalid) return;
        if (this.board) {
            const invite = new Invite(email, this.board.id);
            this.socketService.emit(Messages.newInvite, invite);
        }
    }

    goBack(path: string) {
        this.settings = path;
    }

    // public changeBoardTitle(value: string) {
    //     if (this.board) {
    //         const board = {
    //             id: this.board.id,
    //             title: value,
    //             description: this.board.description,
    //             isFavorite: this.board.isFavorite,
    //             background: this.board.background,
    //         }
    //         this.boardsService.updateBoard(board ).subscribe(item => this.board = board)
    //     }
    // }

    public changeBoardTitle(value: string) {
        if (this.board) {
            const item = {
                id: this.board.id,
                title: value,
            }
            this.boardsService.updateBoard(item as BoardInterface).subscribe(item => {
            })
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }

}
