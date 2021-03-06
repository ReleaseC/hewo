import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController, ToastController,IonicPage } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
//import { HomePage } from "../home/home";
import { TAuth } from '../services';
import { TopupService } from '../services';

declare var WeixinJSBridge;
@IonicPage()
@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html'
})

export class TopupPage extends TCommonPage
{
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public auth: TAuth,
    public service: TopupService)
  {
    super(navCtrl, navParams, loadingCtrl, toastCtrl);
    this.iccid = navParams.get('item');
    this.service.GetOrderList(this.iccid).then(
      data => this.Orderlist(data),
      error => console.log(error)
    );

  }

   ngOnInit(): void
  {
    
  }
  /**
   * 获取充值项目
   *====================================================================================================================
   */
  Orderlist(data) {
    console.log(data);
    if (data.status == 1)
    {
      this.good_items = data.data;
      //todo: 临时处理
      for (let i = 0; i < this.good_items.length; i++)
      {
        let item = this.good_items[i];
        if (item.good_type == 1)
        {
          item.display_name = item.flow_size;
          item.unit = '个月';
          item.mode = '3';//不显示官方指导价无限流量套餐        
        }
        else 
        {
          console.log(item.flow_size)
          if (item.flow_size < 1024)
          {
            item.display_name = 1;
            item.unit = 'M';
          }
          else {
            item.display_name = item.flow_size/1024;
            item.unit = 'G';
          }

        }
      }

      setInterval(() => {
        let nowtime = new Date();
        let endtime= new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
        let expire = (endtime.getTime() - nowtime.getTime())/1000;
        this.hours = Math.floor(expire/3600);
        this.diviser = Math.floor(expire%3600/60);
        this.seconde = Math.floor(expire%60);

        if ( this.hours < 10) {
          this.hours = '0'+this.hours;
        }
        if ( this.diviser < 10 ) {
          this.diviser = '0' + this.diviser
        }
        if ( this.seconde < 10 ) {
          this.seconde = '0' + this.seconde;
        }
        // console.log(this.hours+'//' + this.diviser +'//'+ this.seconde);

      }, 1000);
    }
  }

  /*
   区分不同套餐样式
   */
  OrderStyle(ob) {
    if (ob.mode == 0 || ob.mode == 1 || ob.mode == 3) {
      //新用户
      return {
        'border': '1px solid #F59211',
        'background': 'url("../../assets/icon/Order/yellow.png") bottom no-repeat',
        'background-size': '100%'
      }
    }

  }

  LabelStyle(ob) {
    if (ob.mode == 1 || ob.mode == 0) {
      return {
        'color': '#15a6ff'
      }
    }

  }

  FlowStyle(ob) {
    if (ob.mode == 1 || ob.mode == 0) {
      return {
        'font-size': '1.4rem'
      }
    }
    else {
      return {
        'font-size': '2.5rem'
      }
    }
  }

  BottmStyle (ob) {
    if (ob.mode == 1 || ob.mode == 0) {
      return {
        'margin-top': '13%'
      }
    }
  }
  /**
   * 选择充值项目
   *====================================================================================================================
  */
  ChangeOrder(item)
  {
    let money;
    var unit;
    var flow_size_number;
    if (item.mode == 0) {
      money = (item.price*item.discount)/100/100;
    }
    else {
      money = item.price/100;
    }
    if (item.good_type == 1)
    { //无限
         flow_size_number = item.flow_size;
         unit = "个月";
    
    }else{//有限
         
      if( item.flow_size < 1024 ){
          flow_size_number = 1;
          unit = "M";
      }
      else{
         flow_size_number = (item.flow_size)/1024;
          unit = "G";
      }
    }
   
    let prompt = this.alertCtrl.create({
      title: '充值详情',
      message: "您将订购价值" + money + "元的" + flow_size_number + unit +"流量套餐",
      buttons: [
        {
          text: '确认支付',
          handler: data => {
            this.CreateOrder(item.id, money);
          },
          cssClass:'alertbuttn'
        }
      ]
    });
    prompt.present();
  }

  //创建订单
  CreateOrder(order_id, money) {
    /**
    * 创建充值订单 iccid  套餐ID  价格 类型1
    */
    this.service.CreateOrder(this.iccid, order_id, money*100, this.auth.openid
    ).then(
      data => this.CallPay(data),
      error => console.log(error)
    )

  }

  CallPay(data) {
    console.log(data);

    if (data.status == 1) {
      this.ToPay(data.data);
    }
  }

  CallWeixinPay(data)
  {
    let that = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        "appId": data.appid,
        "timeStamp": data.time_stamp,
        "nonceStr": data.old_nonce_str,
        "package": "prepay_id=" + data.prepay_id,
        "signType": "MD5",
        "paySign": data.pay_sign
      },
      function(res) {        
        WeixinJSBridge.log(res.err_msg);
        if (res.err_msg == 'get_brand_wcpay_request:ok')
        {
            that.navCtrl.setRoot('LoadPage');
        }
        else if (res.err_msg == 'get_brand_wcpay_request:fail') {
          alert(JSON.stringify(res));
        }
    })
  }
  
  ToPay(data)
  {
        if ( WeixinJSBridge == "undefined")
      {
        if (document.addEventListener)
        {
          document.addEventListener('WeixinJSBridgeReady', this.CallWeixinPay, false);
        }
        else if (document.addEventListener){
          document.addEventListener('WeixinJSBridgeReady', this.CallWeixinPay);
          document.addEventListener('onWeixinJSBridgeReady', this.CallWeixinPay);
        }
      }
      else {
        this.CallWeixinPay(data);
      }
  }

  private iccid;
  private good_items;
  private hours;
  private diviser;
  private seconde;
}
