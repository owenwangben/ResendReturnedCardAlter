import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders, FileLikeObject } from 'ng2-file-upload';

@Component({
	selector: 'app-fileupload',
	templateUrl: './fileupload.component.html',
	styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
	uploader: FileUploader;
	hasBaseDropZoneOver: boolean;

	@Input() set uploadUrl(value: string) {
		this.options.url = value;
	}
	@Input() set additionalParameter(value: { [key: string]: any}) {
		this.options.additionalParameter = value;
	}
	@Input() set alias(value: string) {
		this.options.itemAlias = value;
	}
	@Output() fileUploadedSuccess = new EventEmitter<FileUploadResponse>();
	@Output() fileUploadedFailed = new EventEmitter<FileUploadResponse>();
	private options: FileUploaderOptions;

	constructor() {
		this.options = {
			autoUpload: true,
			allowedMimeType: ['image/jpeg', 'image/gif', 'image/tiff']
		};
	}

	ngOnInit() {
		this.uploader = new FileUploader(this.options);
		this.uploader.onCompleteItem = this.onCompleteItem.bind(this);
		this.uploader.onWhenAddingFileFailed = this.onWhenAddingFileFailed.bind(this);
	}

	fileOverBase($evt) {
		this.hasBaseDropZoneOver = $evt;
	}

	onCompleteItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
		if (status === 200) {
			const emitObj: FileUploadResponse = { file: item.file, response: JSON.parse(response)};
			this.fileUploadedSuccess.emit(emitObj);
		} else {
			const emitObj: FileUploadResponse = { file: item.file, response: response };
			this.fileUploadedFailed.emit(emitObj);
		}
	}

	onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
		const emitObj: FileUploadResponse = { file: item, response: '檔案格式不允許' };
		this.fileUploadedFailed.emit(emitObj);
	}
}

interface FileUploadResponse {
	file: FileLikeObject;
	response: string;
}
