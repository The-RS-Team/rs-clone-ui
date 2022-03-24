import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BoardInterface} from "../../../../../interfaces/board.interface";
import {WebsocketService} from "../../../../../shared/services/socket.service";
import {Messages} from "../../../../../app.constants";

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {
    @Input() board: BoardInterface | undefined;
    public boardActivity: any;

    constructor(private socketService: WebsocketService) {
        this.socketService.on(Messages.getAtivityByBoard, this.getActivityByBoardCallback.bind(this));
    }

    ngOnInit(): void {
        this.getActivity();
    }
    
    public getActivityByBoardCallback(activity?: any): void {
        this.boardActivity = activity;
    }

    public getActivity(): void {
        if (this.board) {
            this.socketService.emit(Messages.getAtivityByBoard, this.board.id);
        }
    }

    public ngOnDestroy(): void {
        this.socketService.removeAllListeners();
    }

    htmlToText(val: string): string {
        const tmp = document.createElement('DIV');
          tmp.innerHTML = val;
          return tmp.textContent || tmp.innerText || '';
      }
}
