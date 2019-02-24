/**
 * Created by Administrator on 2017/8/10/010.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
import { TAuth } from '../providers/auth';

@Injectable()
export class SrechargeService extends TBasicService 
{
  constructor(public http: Http, public auth: TAuth) 
  {
    super(http);
  }

  QueryCard(iccid) {
    let data = {};
    data['iccid'] = iccid;

    return this.Put(data, 'query_card');
  }

  QueryCardHistory() {
    return this.Get('input_history');
  }

}
