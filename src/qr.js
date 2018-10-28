const request = require('request');

function _post(url, data){      
    return new Promise((resolve, reject)=>{
     // reject(url)
     request.post(url, {
         form: data,
         encoding: 'base64'
        }, (err,resp,body)=>{     
        if(err){
          reject(err)
        }
        resolve({data: `data:image/png;base64,${body}`})  
      
      })
    })
  }


/*
@obj {
    amount: Number,
    detail: String,
    referenceNo: Number, // เลขที่อ้างอิง เช่น 20171128001 (4 ตัวแรกเป็น ปี คศ. 2 ตัวถัดไปเป็น เดือน 2 ตัวถัดไปเป็นวันที่ 3 ตัวหลังเป็นการรันเลขตามลาดับ)
    token: String, // GBPAY Token
    webhook: String // url webhook เป็นการตอบกลับหลังจากที่ทำรายการสำเร็จ ฝั่ง Server
}
*/

function PromptPay(obj){
    var setData ={         
            amount: obj.amount,
            detail: obj.detail, 
            referenceNo: obj.referenceNo,
            token: obj.token,  
            payType: 'F',  
            backgroundUrl: obj.webhook, 
            responseUrl: obj.webhook
        };
    
    //console.log(query)
    return _post('https://api.gbprimepay.com/gbp/gateway/qrcode',setData);
}

// Test Function
//PromptPay({
//    amount: 5,
//    detail: 'Oxise.IO',
//    referenceNo: ,
//    token: '',
//    webhook: ''
//}).then(res =>{
//    console.log(res)
//}).catch(err =>{
//    console.log(err)
//})

module.exports = PromptPay;