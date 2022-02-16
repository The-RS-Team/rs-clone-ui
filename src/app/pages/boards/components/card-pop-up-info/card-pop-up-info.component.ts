import {
    Component,
    ElementRef,
    Inject,
    OnInit, Optional, Output,
    ViewChild,
} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {BoardsService} from "../../boards.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {OpenFileComponent} from "./open-file/open-file.component";
import {Subscription} from "rxjs";
import {FileInterface} from "../../../../interfaces/file.interface";
import {Card} from "../../../../models/card";
import {WebsocketService} from "../../../../shared/services/socket.service";
import {Messages} from "../../../../app.constants";
import {EventEmitter} from "@angular/core";

@Component({
    selector: "app-card-pop-up-info",
    templateUrl: "./card-pop-up-info.component.html",
    styleUrls: ["./card-pop-up-info.component.scss"],
})
export class CardPopUpInfoComponent implements OnInit {
    @ViewChild("descriptionTextarea") descriptionTextarea: ElementRef | undefined;
    @ViewChild("test") test: ElementRef | undefined;
    @ViewChild("link") link: ElementRef | undefined;

    public imageEl: HTMLImageElement | undefined;
    public files: any[] = [];

    public file: File | undefined;
    fileName = "";
    fileValue: any;

    private sub$ = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private sanitization: DomSanitizer,
        private http: HttpClient,
        private boardsService: BoardsService,
        private socketService: WebsocketService
    ) {}

    ngOnInit(): void {
        this.getFilesByCardId(this.data.id);

        this.getCardItems();
        this.socketService.on(Messages.getCarditems, (info: any) => {
            this.data.cardItems = info;
        })

        this.socketService.on(Messages.updateCard, this.updateCardCallback.bind(this));
        this.socketService.on(Messages.newFile, this.newFileCallback.bind(this));

    }
    newFileCallback(card: any) {
        console.log('newCardCallback', card)
    }
    updateCardCallback(card: any) {
        console.log('newCardCallback', card)
    }

    public changeCardParam(title: string, description: string) {
        this.data.title = title;
        this.data.description = description;

        const item = {
            id: this.data.id,
            title: this.data.title,
            columnId: this.data.columnId,
            position: this.data.position,
            description: this.data.description,
        }
        this.socketService.emit(Messages.updateCard, item);
    }


    public convertFiles(files: any): void {
        files = files.map((file: any) => {
            if (!file) {
                return;
            }
            let binary = "";
            let bytes = new Uint8Array(file.buffer.data);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            let src = window.btoa(binary);

            file.src = "data:" + file.mimetype + ";base64," + src;

            return file;
        });
    }

    openDialog(file: FileInterface) {
        if (
            file.mimetype.split("/")[0] !== "image" &&
            file.mimetype.split("/")[1] !== "pdf" &&
            file.mimetype.split("/")[0] !== "gif"
        ) {
            let downloadLink = document.createElement("a");
            var binaryData = [];
            binaryData.push(file);
            downloadLink.href = window.URL.createObjectURL(
                // @ts-ignore
                new Blob(binaryData, {type: file.mimetype})
            );

            downloadLink.setAttribute("download", file.originalname);
            downloadLink.click();
            return;
        }
        const dialogRef = this.dialog.open(OpenFileComponent, {
            panelClass: "my-class",
            data: file,
        });

        dialogRef.afterClosed().subscribe((result) => {
        });
    }


    getFilesByCardId(id: string) {
        this.sub$.add(
            this.boardsService
                .getAllFiles(id)
                .subscribe((files) => {
                    this.files = files;
                    this.convertFiles(this.files);
                }));
    }

    getCardItems() {
        this.socketService.emit(Messages.getCarditems, this.data.id)
    }


    getFile(id: any) {
        this.boardsService.getFileById(id).subscribe((blob) => {
        });
    }

    onFileSelected(event: Event) {
        // @ts-ignore
        const file: File = event.target?.files[0];



        console.log(file, 'fileToUpload')
        const fileToUpload = {
            originalname: file.name,
            size: file.size,
            mimetype: file.type,
            encoding: '',
            buffer: file,
            cardId: this.data.id,
        }

        this.socketService.emit(Messages.newFile, fileToUpload);
         this.getFilesByCardId(this.data.id);


        // this.boardsService.postFile(file, this.data.id).subscribe(
        //     (value) => {
        //         this.fileValue = value;
        //         this.getFilesByCardId(this.data.id);
        //     },
        //     (error) => console.log(error)
        // );
    }

    onDeleteFile(fileId: string): void {
        this.boardsService.deleteFile(fileId)
            .subscribe(
                (response) => {
                    this.getFilesByCardId(this.data.id)
                }
            )
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();

        this.socketService.socket.removeAllListeners();
    }
}
