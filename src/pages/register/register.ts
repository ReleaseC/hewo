import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { TAuth } from '../services';

@IonicPage({name: 'RegisterPage'})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage extends TCommonPage
{

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public auth: TAuth)
  {
    super(navCtrl, navParams, loadingCtrl, toastCtrl);

  }

  //点击btn 发送验证码
  sendcode() {
    this.loadingCtrl.create();
    if ((this._Phonenum == null) || (this._Phonenum == undefined))
    {
      this.ShowToast('手机号不能为空！');
      return;
    }
    let second = 60;
    this.changedisable = true;
    let iTime = setInterval(() => {
      if( second <= 0 ) {
        second = 60;
        clearInterval(iTime);
      }
      else {
        second--;
        this.sendbtn = '已发送 '+ second;
      }
      if( second == 0) {
        this.sendbtn = '重新发送';
        this.changedisable = false;
      }
    },1000);
    //请求验证码接口
    this.auth.SendCode(
      this.Phonenum
    ).then(
      error => console.log(error)
    )

  }

  Submit() {
    if ((this._Phonenum == null) || (this._Phonenum == undefined)) {
      this.ShowToast('手机号不能为空！');
      return;
    }
    if ((this._myCode == null) || (this._myCode == undefined)){
      this.ShowToast('验证码不能为空！');
      return;
    }

    this.auth.RegisterUser(
      this._Phonenum,
      this._myCode
    ).then(
      data => this.RegisterFinish(data),
      error => console.log(error)
    )

  }

  RegisterFinish(data) {
    let success = data.status;
    if (success == 0) {
      this.ShowToast(data.msg);
    }
    else if (success == 1) {
      if ( localStorage.getItem('iccid') != null ) {
        if ( localStorage.getItem('iccid') != null && parseInt(localStorage.getItem('state')) == 1) {
          this.navCtrl.push('ActionPage');
        }
        else {
          this.navCtrl.push('SrechargePage');
        }
      }
      else {
        this.navCtrl.push('HomePage');
      }
    }
    else if (success == 2) {
      this.ShowToast("角色已注册!");
    }
    else {
      console.log(data);
    }

  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get sendbtn(): string {
    return this._sendbtn;
  }

  set sendbtn(value: string) {
    this._sendbtn = value;
  }

  get Phonenum(): number {
    return this._Phonenum;
  }

  set Phonenum(value: number) {
    this._Phonenum = value;
  }

  get myCode(): number {
    return this._myCode;
  }

  set myCode(value: number) {
    this._myCode = value;
  }

  private _Phonenum: number;
  private _myCode: number;
  private _title: string;
  private _sendbtn = '发送验证码';
  private changedisable = false;
  
}
