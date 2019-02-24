import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TBasicService } from '../providers/basic-service';
import { TAuth } from '../providers/auth';
import { HomeService } from '../providers/home-service';
import { TopupService } from '../providers/topup-service';
import { ActionService } from "../providers/action-service";
import { RechargeService } from  '../providers/recharge-service' ;
import { SrechargeService } from '../providers/srecharge-service';
import { CustomerService } from '../providers/customer-service';
// import { NumberunitPipe } from '../pipes/numberunit/numberunit';
// import { NumberfilePipe } from '../pipes/numberfile/numberfile';

@NgModule({
  declarations: [
    MyApp,
    // NumberunitPipe,
    // NumberfilePipe,
  ],
  imports: [
    HttpModule,
    JsonpModule,
    BrowserModule,    
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
     MyApp
  ],
  providers: [    
    TBasicService,
    TAuth,
    HomeService,
    ActionService,
    RechargeService,
    SrechargeService,
    CustomerService,
    TopupService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
