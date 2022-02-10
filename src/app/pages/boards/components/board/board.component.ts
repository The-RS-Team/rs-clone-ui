import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {BoardsService} from '../../boards.service';
import {ActivatedRoute} from '@angular/router';
import {Board} from '../../../../models/board';
import {WebsocketService} from '../../../../shared/services/socket.service';
import {Messages} from '../../../../app.constants';
import {Column, ColumnDeleteResult} from '../../../../models/column';
import {ColumnInterface} from '../../../../interfaces/column.interface';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit, AfterViewInit, OnDestroy {
    private sub$ = new Subscription();
    public bg = {};
    public boardWrapper: HTMLElement | undefined;
    public board: Board = new Board('', '', '', false, '', []);

    constructor(private boardsService: BoardsService,
                private socketService: WebsocketService,
                private activatedRoute: ActivatedRoute,
    ) {
    }

    @ViewChild('boardWrapper')
    boardWrap: ElementRef | undefined;


    ngOnInit(): void {
        this.boardsService.getBoardById(this.activatedRoute.snapshot.queryParams['id'])
            .subscribe((board) => {
                this.board = board;
                this.bg = JSON.parse(board.background)
                this.board.columns = this.board.columns || [];
            })
        this.socketService.on(Messages.newColumn, this.newColumnCallback.bind(this));
        this.socketService.on(Messages.deleteColumn, this.deleteColumnCallback.bind(this));
    }

    newColumnCallback(column: Column): void {
        console.log('newColumnCallback', column)
        if (column) {
            this.board.columns.push(column);
        }
    }

    deleteColumnCallback(deleteResult: ColumnDeleteResult): void {
        console.log('deleteColumnCallback', deleteResult)
        if (deleteResult.affected > 0) {
            deleteResult.raw.forEach(id => this.board.columns.splice(
                this.board.columns.indexOf(
                    <ColumnInterface>this.board.columns.find(column => column.id === id)
                ), 1)
            )
        }
    }

    ngAfterViewInit() {
        this.boardWrapper = this.boardWrap?.nativeElement;
    }

    public addNewColumn(): void {
        const newColumnModel = {
            title: '',
            cards: [],
            boardId: this.board.id,
            description: '',
            position: this.board.columns.length + 1
        };
        // this.board.columns.push(newColumnModel);
        // this.socketService.newColumn(newColumnModel);
        this.socketService.emit(Messages.newColumn, newColumnModel);
    }

    public deleteColumn(columnId: string) {
        const listToDelete = this.board.columns.find(column => column.id === columnId)
        if (listToDelete) {
            // this.board.columns.splice(this.board.columns.indexOf(listToDelete), 1);
            // this.socketService.deleteColumn(columnId);
            this.socketService.emit(Messages.deleteColumn, columnId);
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
