import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {BoardsService} from '../../boards.service';
import {ActivatedRoute} from '@angular/router';
import {Board} from '../../../../models/board';
import {WebsocketService} from '../../../../shared/services/socket.service';
import {Messages} from '../../../../app.constants';
import {Column, ColumnDeleteResult} from '../../../../models/column';
import {ColumnInterface} from '../../../../interfaces/column.interface';
import {BoardInterface} from "../../../../interfaces/board.interface";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {CardInterface} from "../../../../interfaces/card.interface";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('boardWrapper')
    public boardWrap: ElementRef | undefined;
    private sub$ = new Subscription();
    public bg = {};
    public boardWrapper: HTMLElement | undefined;
    public board: BoardInterface = new Board('', '', '', false, '', []);

    constructor(private boardsService: BoardsService,
                private socketService: WebsocketService,
                private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.boardsService.getBoardById(this.activatedRoute.snapshot.queryParams['id'])
            .subscribe((board) => {
                this.board = board;
                this.bg = JSON.parse(board.background)
                this.board.columns = this.board.columns || [];
                this.board.columns.sort((a, b) => a.position > b.position ? 1 : -1);
            });
        this.socketService.on(Messages.newColumn, this.newColumnCallback.bind(this));
        this.socketService.on(Messages.updateColumn, this.updateColumnCallback.bind(this));
        this.socketService.on(Messages.deleteColumn, this.deleteColumnCallback.bind(this));
    }

    public newColumnCallback(column: ColumnInterface): void {
        console.log('newColumnCallback', column)
        if (column) {
            this.board.columns?.push(column);
        }
    }

    public updateColumnCallback(column: ColumnInterface): void {
        console.log('newColumnCallback', column)
    }

    deleteColumnCallback(deleteResult: ColumnDeleteResult): void {
        console.log(this.board, 'this.board Callback')

        const columnToDelete = this.board.columns.find(column => column.id === deleteResult.raw[0])
        if (deleteResult.affected > 0) {
            if (this.board.id === columnToDelete?.boardId) {
                if (deleteResult.affected > 0) {
                    this.board.columns.splice(
                        this.board.columns.indexOf(
                            <ColumnInterface>this.board.columns.find(column => column.id === deleteResult.raw[0])
                        ), 1)
                }
            }
        }
    }

    ngAfterViewInit() {
        this.boardWrapper = this.boardWrap?.nativeElement;
    }

    public addNewColumn(event: Event): void {
        if (this.board) {

            const newColumnModel = {
                title: '',
                cards: [],
                boardId: this.board.id,
                description: '',
                position: this.board.columns.length + 1
            };
            this.socketService.emit(Messages.newColumn, newColumnModel);
        }
    }

    public drop(event: CdkDragDrop<ColumnInterface[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
        const column = event.container.data[event.currentIndex];

        if (this.board.id != null) {
            column.boardId = this.board.id;
        }

        const item = {
            id: column.id,
            boardId: column.boardId,
            title: column.title,
            position: column.position,
            description: column.description,
        }

        this.socketService.emit(Messages.updateColumn, item);

        this.board.columns = event.container.data.map((el, index) => {
            el.position = index;
            return el;
        });

        this.board.columns.forEach(column => {
            const item = {
                id: column.id,
                boardId: column.boardId,
                title: column.title,
                position: column.position,
                description: column.description,
            }
            this.socketService.emit(Messages.updateColumn, item);
        })

        console.log(this.board, 'this.column')
    }

    public deleteColumn(columnId: string) {
        console.log(columnId, 'columnID')
        console.log("DELETECOLUMN")
        const listToDelete = this.board.columns.find(column => column.id === columnId)
        console.log(listToDelete, 'listToDelete')
        if (listToDelete) {
            this.socketService.emit(Messages.deleteColumn, columnId);
        }
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
        this.socketService.removeAllListeners();
    }
}
