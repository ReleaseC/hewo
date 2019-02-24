import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, IonicPage, NavParams } from 'ionic-angular';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { TCommonPage } from '../basic-page';
import { CustomerService } from '../../providers/customer-service';
import { const_data } from '../../common/application-const';
 
@IonicPage()
@Component({
  selector: 'page-certification',
  templateUrl: 'certification.html',
})
export class CertificationPage extends TCommonPage implements OnInit
{
  that = this;
  constructor(
      public navCtrl: NavController, 
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      public navParams: NavParams,
      public service: CustomerService) 
  {    
    super(navCtrl, navParams, loadingCtrl, toastCtrl);

    this.ids.push(0);
    this.ids.push(1);
    this.ids.push(2);

    //Note: 必须移除cookie，否则跨越设置的'*'通配符将不会生效，现在我们的nginx设置是'*',如果换成是具体到某个域名的话，这个问题将不会存在    
    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      fileItem.withCredentials = false;
    }    
  }

  ngOnInit(): void
  {
    console.log("<<<<<<<<<<<<<<<<<")
    console.log(this.uploader);
  }

  OnFileSelected(data, id)
  {
    console.log(data);

    let files = this.uploader.queue;

    console.log(files.length);
    for (let i = 0; i < files.length; i++)
    {
      let item = files[i];
      console.log(item);
      let data_item = this.GetItemById(id);
      if (data_item == undefined)
      {
        data_item = {
          "id": id,
          "item": item,
          "updated": true
        };

        this.imgs.push(data_item);
      }
      else {
        data_item.item = item;
        data_item.updated = true;
      }
    }

    let that = this;
    for (let i = 0; i < this.imgs.length; i++)
    {
      let cur_item = this.imgs[i];
      if (!cur_item.updated)
      {
        continue;
      }

      this.Loading('加载图片中');
      let reader = new FileReader();
      reader.readAsDataURL(cur_item.item._file)
      reader.onload = function() {
        cur_item.img = this.result;
        cur_item.updated = false;
        that.FreeLoading();
      }
    }  

    console.log(this.imgs);
  }

  GetItemById(id)
  {
    let result = undefined;
    for (let i = 0; i < this.imgs.length; i++)
    {
      if (this.imgs[i].id == id)
      {
        result = this.imgs[i];
        break;
      }
    }

    return result;
  }
  
  GetSelectedImg(id)
  {
    let result = '';

    switch(id)
    {
      case 0: result = '../assets/icon/certificate/a.png'; break;
      case 1: result = '../assets/icon/certificate/b.png'; break;
      case 2: result = '../assets/icon/certificate/c.png'; break;
    }

    for (let i = 0; i < this.imgs.length; i++)
    {
      if (this.imgs[i].id == id)
      {
        result = this.imgs[i].img;
        break;
      }
    }

    return result;
  }
  
  UploadImg()
  {
    let that = this;
    for (let i = 0; i < this.imgs.length; i++)      
    {
      let item = this.imgs[i].item;    
      let new_name = 'default.png';
      switch(this.imgs[i].id)
      {
        case 0: new_name = this.id + 'a'; break;
        case 1: new_name = this.id + 'b'; break;
        case 2: new_name = this.id + 'c'; break;    
      }

      let idx = item.file.name.lastIndexOf(".");
      if (idx > 0)
      {
        let n = item.file.name.length;
        let ext_name = item.file.name.substring(idx + 1, n);
        new_name = new_name + "." + ext_name;
      }

      item.onSuccess = function(response, status, headers) {
        if (status == 200) 
        {
          let retval = JSON.parse(response);
          console.log(retval);

          that.upload_count += 1;
          if (that.upload_count >= 3)
          {
            that.upload_count = 0;
            that.FreeLoading();
    
            that.imgs = [];
            that.uploader.clearQueue();

            if(retval.status == 1){
              that.ShowToast('实名认证成功！', 5000);
            }
            else{
              that.ShowToast('实名认证失败！', 5000);
            }
          }
        }
        else {
          console.log("upload error")
        }

      };

      item.file.name = new_name;
      
      this.uploader.uploadItem(item);
    }
  }

  StartAuth()
  {
    this.page_index = 1;
  }

  Submit()
  {
    if (this.iccid == undefined)
    {
      this.ShowToast('请输入SIM卡号！');
      return;
    }
    else if (this.iccid.length < 8) 
    {
      console.log(this.iccid.length);
      this.ShowToast('SIM卡号至少需要8位！');
      return;
    }

    if (this.realname == undefined)
    {
      this.ShowToast('请输入真实姓名！');
      return;
    }

    if (this.id == undefined)
    {
      this.ShowToast('请输入身份证号！');
      return;
    }
    else if (this.id.length < 18)
    {
      this.ShowToast('请输入完整身份证号！');
      return;
    }

    if (this.imgs.length < 3)
    {
      this.ShowToast('请上传完整身份证照片！');
      return;
    }

    let data = {"iccid": this.iccid, "name": this.realname, "id_no": this.id}
    this.service.Put(data, 'realname').then(
      data => {
        console.log(data);
        this.upload_count = 0;
        this.Loading('上传图片中...', 15000);
        this.UploadImg();
      },
      error => console.log(error)
    )
  }
  
  public uploader: FileUploader = new FileUploader({url: const_data.host_url + '/realname'});
  private ids = [];
  private imgs = [];
  private page_index = 0;
  private iccid;
  private realname;
  private id;
  private upload_count = 0;
}
