import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class TBasicService 
{
  constructor(public http: Http)
  {
    if (this.host_url == "" || this.logo_url == "")
    {
      this.host_url = localStorage.getItem('host_url');
      this.logo_url = localStorage.getItem('logo_url');

      this.is_corp = localStorage.getItem('is_corp') === '1';
    }    
  }

  CreateHeader(): any
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    if (token)
    {
      headers.append('Authorization', token);
    }

    return new RequestOptions({headers: headers});
  }

  // Access(url: string)
  // {
  //   let apiURL = url + '?callback=JSONP_CALLBACK';
  //   console.log(apiURL);
  //   return this.jsonp.request(apiURL, {method: 'Get'});
  // }

  Get(uri: string): Promise<any>
  {
    let url = this.host_url + '/' + uri;
    let options = this.CreateHeader();
    // console.log(options)
    return this.http.get(url, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Post(data: any, uri?: string): Promise<any>
  {
    let url = this.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }

    let options = this.CreateHeader();
    return this.http.post(url, data, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Put(data: any, uri?: string): Promise<any>
  {
    let url = this.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }

    console.log(url);

    let options = this.CreateHeader();
    return this.http.put(url, data, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  Delete(uri?: string): Promise<any>
  {
    let url = this.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }

    let options = this.CreateHeader();
    return this.http.delete(url, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError)
  }

  private extractData(res: Response)
  {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any)
  {
    let errMsg: string;
    if (error instanceof Response)
    {
      errMsg = `${error.status} - ${error.statusText}`;
    }
    else
    {
      errMsg = error.message ? error.message : error.toString();
    }

    //console.error(errMsg);
    return Promise.reject(errMsg);
  }

  public host_url: string = "";
  public logo_url: string = "";
  public is_corp: boolean = true;
}
