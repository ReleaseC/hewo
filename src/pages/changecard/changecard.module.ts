import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangecardPage } from './changecard';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    ChangecardPage,
  ],
  imports: [
    FileUploadModule,
    IonicPageModule.forChild(ChangecardPage),
  ],
  exports: [
    ChangecardPage
  ]
})
export class ChangecardPageModule {}
