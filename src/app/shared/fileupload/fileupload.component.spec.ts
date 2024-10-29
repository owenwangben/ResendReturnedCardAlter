import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadComponent } from './fileupload.component';
import { FileUploadModule, FileItem } from 'ng2-file-upload';

describe('FileuploadComponent', () => {
  let component: FileuploadComponent;
  let fixture: ComponentFixture<FileuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FileUploadModule ],
      declarations: [ FileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('被建立時, uploader應該要有值', () => {
    expect(component.uploader).toBeTruthy();
  });

  it('執行 fileOverBase 應當改變hasBaseDropZoneOver', () => {
    component.hasBaseDropZoneOver = false;
    component.fileOverBase(true);
    expect(component.hasBaseDropZoneOver).toBeTruthy();
  });

  it('執行 onCompleteItem 時, 若status是200, 應該要執行 success 的emit', () => {
    const spy = spyOn(component.fileUploadedSuccess, 'emit');
    const file = <FileItem>{ file: null };
    const response = 'response';
    component.onCompleteItem(file, response, 200, null);

    expect(spy).toHaveBeenCalled();
  });

  it('執行 onCompleteItem 時, 若status不是200, 應該要執行failed的emit', () => {
    const spy = spyOn(component.fileUploadedFailed, 'emit');
    const file = <FileItem>{ file: null };
    const response = 'response';
    component.onCompleteItem(file, response, 500, null);

    expect(spy).toHaveBeenCalled();
  });

  it('執行 onWhenAddingFileFailed 時, 應該要執行failed的emit', () => {
    const spy = spyOn(component.fileUploadedFailed, 'emit');
    component.onWhenAddingFileFailed(null, null, null);
    expect(spy).toHaveBeenCalled();
  });
});
