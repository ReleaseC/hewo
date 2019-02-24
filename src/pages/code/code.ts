import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TBasicService } from '../../providers/basic-service';

@IonicPage()
@Component({
  selector: 'page-code',
  templateUrl: 'code.html'
})

export class CodePage
{
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: TBasicService)
  {
    this.imgsrc = service.logo_url;
  }

  private imgsrc = "";
}
