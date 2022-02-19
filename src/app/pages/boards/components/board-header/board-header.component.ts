import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BoardInterface} from '../../../../interfaces/board.interface';
import {Messages} from '../../../../app.constants';
import {BoardsService} from '../../boards.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Invite} from '../../../../models/invite';
import {WebsocketService} from '../../../../shared/services/socket.service';

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
    public boardTitleInput = new FormControl('', {updateOn: 'blur'});
    public formGroup: FormGroup | any;

    constructor(private readonly boardsService: BoardsService,
                private readonly socketService: WebsocketService,
                private readonly fb: FormBuilder,) {
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

        this.boardsService.updateBoard({
            id: this.board.id,
            isFavorite: this.board.isFavorite,

        } as BoardInterface)
            .subscribe(
                resp => {
                }
            )
    }

    public ngAfterViewInit(): void {
        this.menu = this.menuWrapper?.nativeElement;
    }

    public openMenu() {
        this.menu!.className = 'menu opened';
        this.isMenuOpen = true;
    }

    public closeMenu() {
        this.menu!.className = 'menu';
        this.isMenuOpen = false;
    }

    public openSettings(key: string) {
        this.isSubMenu = true;
        switch (key) {
            case 'bg':
                this.settings = 'bg';
                break;
            case 'about':
                this.settings = 'about';
                break;
            case 'participants':
                this.settings = 'participants';
                break;
            case 'actions':
                this.settings = 'actions';
                break;
        }
    }

    public openInvite() {
        this.isInvite = true;
    }

    public closeInvite() {
        this.isInvite = false;
    }

    newInviteCallback(invite: Invite): void {
        console.log('newInviteCallback', invite)

    }

    public sendInvite(email: string) {
        if (this.formGroup.invalid) return;
        if (this.board) {
            const invite = new Invite(email, this.board.id, document.location.origin);
            this.socketService.emit(Messages.newInvite, invite);
        }
    }

    public goBack(path: string) {
        this.settings = path;
    }

    public changeBoardTitle(value: string) {
        if (this.board) {
            const item = {
                id: this.board.id,
                title: value,
            }

            this.boardsService.updateBoard(item as BoardInterface).subscribe(item => {
            })
            console.log(this.boardTitleInput);
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }

}
