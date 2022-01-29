import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-card-pop-up',
    templateUrl: './card-pop-up-info.component.html',
    styleUrls: ['./card-pop-up-info.component.scss']
})
export class CardPopUpInfoComponent implements OnInit {

    // @ViewChild('files') files: ElementRef | undefined;

    public fileName = '';

    public selectedFiles: FileList | undefined;

    public files: string[] = [];


    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    onFileSelected(event: Event) {
        // @ts-ignore
        const file: File = event.target?.files[0];

        this.files.push(file.name);
        console.log(this.files, 'files')
    }
}
