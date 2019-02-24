import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { PlatformLocation } from '@angular/common';
import { TAuth }  from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})

export class MyApp
{
  rootPage = undefined;
  loader = undefined;

  constructor(
    private Auth: TAuth,
    private loadingCtrl: LoadingController,
    private location: PlatformLocation)
  {
    this.Loading();
    
    let l = location['location'];
    Auth.GetHostName(l.hostname); //存储host来源
    Auth.GetRequestParam(location.search);

    this.Auth.login().then(
      data => localStorage.setItem('token', data.token),
      error => console.log(error)
    );
    //判断是否微信用户
    this.Auth.CheckUser().then(
      data => this.SetStartPage(data),
      error => console.log(error)
    )
    
  }  

  //初始化 调用请求是否为新用户的方法 customer/openid
  SetStartPage(data)
  {
    console.log("<<<<<<<<<<<<<<<<<<<<Set Start Page");
    console.log(data);
    this.Auth.UserInfo = data.data;
    
    switch(data.status)
    {
      case -1:
        this.rootPage = 'CodePage';
        break;

      case 0:        
        this.rootPage = 'RegisterPage';
        break;

      case 1:
        //判断是否有iccid
        let state = parseInt(this.Auth.state);
        if (this.Auth.iccid != null)
        {
          let state = parseInt(this.Auth.state);
          if (state == 1)
          {
            this.rootPage = 'ActionPage';
          }
          else if (state == 0)
          {
            this.rootPage = 'SrechargePage';
          }
        }
        else
        {
          if (state == 2)
          {
            this.rootPage = 'ChangecardPage';
            //localStorage.setItem('changeiccid', this.Auth.iccid);
          }
          else {
            this.rootPage = 'HomePage'; //首页
          }
          
        }
    }

    this.FreeLoading();
  }

  Loading(context="数据加载中", duration=5000)
  {
      if (this.loadingCtrl != undefined)
      {
          this.loader = this.loadingCtrl.create(
              {
                  content: context,
                  duration: duration
              }
          );
          this.loader.present();
      }
  }

  FreeLoading()
  {
      if (this.loader != undefined)
      {
          this.loader.dismiss();
      }
  }

}

