import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  ngOnInit(): void{
     this.times();
  }
  ionViewDidLoad() {
   
  }
 ToHome(){
   this.navCtrl.push('HomePage');
 }
  times(){
    this.num = 6;
    setInterval(() => {
      if(this.num > 0){
         this.changeCount();
      }
      return
    }, 1000);
  }
  changeCount(){
    console.log(this.num--); 
    if(this.num == 0){
      this.rechargestate = 2;
      return
    }
  }
  private num:number;
  private rechargestate = 0;
}

