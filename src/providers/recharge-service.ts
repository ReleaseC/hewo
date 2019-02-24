/**
 * Created by Administrator on 2017/8/10/010.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
import { TAuth } from '../providers/auth';

@Injectable()
export class RechargeService extends TBasicService 
{
  constructor(public http: Http, public auth: TAuth) 
  {
    super(http);
  }

  GetOrders() 
  {
    console.log('this is wx_orders');
    return this.Get('wx_orders');
  }

  GetOrderByiccid(iccid) 
  {
    let data = {};
    data['iccid'] = iccid;

    return this.Put(data, 'wx_orders')
  }
}
