import {Component, OnInit} from '@angular/core';
import {BoardsService} from "../../../boards.service";
import {UsersService} from "../../../users.service";
import {Subscription} from "rxjs";
import {UserInterface} from "../../../../../interfaces/user.interface";

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

    public sub$ = new Subscription();
    public users: UserInterface[] = [];

    constructor(private usersService: UsersService) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    public getUsers() {
        this.sub$.add(
            this.usersService
                .getUsers()
                .subscribe((users) => {
                    this.users = users;
                    console.log(this.users)
                }));
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
