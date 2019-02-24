import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
import { const_data } from '../common/application-const';

@Injectable()
export class TAuth extends TBasicService
{
  constructor(public http: Http)
  {
    super(http);
  }

  get state(): string
  {
    return localStorage.getItem('state');
  }

  set state(value: string)
  {
    localStorage.setItem('state', value);
  }

  get openid(): string
  {
    return localStorage.getItem("openid");
  }

  set openid(value: string)
  {
    localStorage.setItem("openid", value);
  }

  get iccid(): string
  {
    return localStorage.getItem("iccid");
  }

  set iccid(value: string)
  {
    localStorage.setItem("iccid", value);
  }

  get genre(): any
  {
    return localStorage.getItem("genre");
  }

  set genre(value: any)
  {
    localStorage.setItem("genre", value);
  }

  GetRequestParam(url)
  {
    console.log(url);
    localStorage.removeItem('openid');
    if (url)
    {
        let idx = url.indexOf("?");
        if (idx != -1)
        {
            let uri = url.slice(idx + 1);
            uri = uri.split("&");
            // console.log(uri)
            for (let param of uri)
            {
              let p = param.split('=');
              if (p.length > 1)
              {
                let param_name = p[0];
                let param_value = p[1];
                console.log(param_name +'=' + param_value);
                localStorage.setItem(param_name, param_value);
              }
            }
        }
    }
  }

  login()
  {
      let param = {"username": this.openid};
      console.log(this.openid)
      return this.Post(param, 'login2');
  }

  logout()
  {
    localStorage.removeItem('token');
  }

  has_logon(): Boolean
  {
    return localStorage.getItem('token') != undefined;
  }
  //签到
  Sign() {
    let data = {};
    data['openid'] = this.openid;
    return this.Put(data,'sign');

  }

  RegisterUser(Phonenum,mycode: number) {
    let data = {};

    data['openid'] = this.openid;
    data['mobile_no'] = Phonenum;
    data['code'] = mycode;

    return this.Post(data, 'customer');
  }

  SendCode(Phonenum) {
    return this.Get('get_code/' + Phonenum);
  }

  CheckUser() 
  {
    console.log("check user..., openid: " + this.openid);
    let data = {};
    data['openid'] = this.openid;
    
    return this.Put(data, 'check_customer');
  }

  /**
   * 签到页面  获取已签到日期
   * =================================================================================================
   */
   GetsignTime() {
     let data = {};
     return this.Put(data, 'sign_list')
  }

  GetHostName(hostname)
  {
    console.log("hostname: " + hostname);

    //hostname = 'sub1036m.iwoyi.cn';
    if (hostname != undefined)
    {
      if (hostname == 'localhost')
      {
        this.host_url = const_data.host_url;
        this.logo_url = const_data.logo_url;  
      }
      else {
        let data = hostname.split('.');      
        let logo_name = data[0];
        let n = logo_name.length;
        let server_name = logo_name;
  
        if (logo_name[n-1] == 'm')
        {
          server_name = logo_name.substring(0, n - 1);
        }
        
        this.is_corp = (server_name == "qx") || (server_name == "sub23");
        this.host_url = "http://" + server_name + ".iwoyi.cn:6888";
        this.logo_url = "http://sub23m.iwoyi.cn/logo/" + logo_name + ".jpg";
      }      
    }
    else {
      this.host_url = const_data.host_url;
      this.logo_url = const_data.logo_url;
    }

    if (this.is_corp)
    {
      localStorage.setItem('is_corp', '1');
    }
    else {
      localStorage.setItem('is_corp', '0');
    }
    
    localStorage.setItem('host_url', this.host_url);
    localStorage.setItem('logo_url', this.logo_url);

    console.log("is corp:" + this.is_corp);
    console.log("host url:" + this.host_url);
    console.log("logo url:" + this.logo_url);
  }
  

  public UserInfo = {};
}
