/*************************** PAY-AREA ***************************/
let pay_check = document.getElementById('pay-check');
let btn_pay = document.getElementsByClassName('btn-pay');
let pay_inputs= document.querySelectorAll('.payment-area>.content>.card-info input:not(input[type="checkbox"])');
let pay_select=document.querySelectorAll('.payment-area>.content>.card-info select')

/************************* Pay-CheckBox Start *************************/
pay_check.addEventListener('click', function () {

    if(pay_check.checked){
        for(let i=0;i<btn_pay.length;i++){
            btn_pay[i].classList.replace('disabled','enabled');
        }
    }

    else{
        for(let i=0;i<btn_pay.length;i++){
            btn_pay[i].classList.replace('enabled','disabled');
        }
    }
})
/************************* Pay-CheckBox End *************************/

/************************* Pay-Button Start *************************/
for(let i=0;i<btn_pay.length;i++){

    btn_pay[i].addEventListener('click',function(){
    
    if(btn_pay[i].classList.contains('enabled')){
        for(let i=0;i<pay_inputs.length;i++){
            if(pay_inputs[i].value==false || pay_select[i].value==false){
                pay_inputs[i].classList.add('error');
                pay_select[i].classList.add('error','w-50');
            }

            else{
                pay_inputs[i].classList.remove('error');
            }
        }
    }})
}
/************************* Pay-Button End *************************/

/************************* Total Start *************************/
let sub_total=Number(document.getElementById('sub-total').innerHTML);
let cargo_total=Number(document.getElementById('cargo-total').innerHTML);
let discount=document.getElementById('discount');
let total=document.getElementById('total');

discount.innerHTML=-(((sub_total+0.1)*40)/100).toFixed(0);

total.innerHTML=((sub_total+Number(discount.innerHTML))+cargo_total).toFixed(2);
/************************* Total End *************************/

/************************* Buy Event Start (Payment Request) *************************/

const desteklenenOdemeYontemleri = [{
    supportedMethods: ['basic-card']
}];
const odemeDetaylari = {
    total: {
        label: 'Toplam',
        amount: {
            currency: 'TRY',
            value: total.innerHTML
        }
    }
};

const request = new PaymentRequest(desteklenenOdemeYontemleri, odemeDetaylari);

async function buyMe() {
    for(let i=0;i<btn_pay.length;i++){
        if(btn_pay[i].classList.contains('enabled')){
    // Show the payment screen and wait for the relevant payment information to be filled
    const paymentResponse = await request.show();
    // Complete the payment
    await paymentResponse.complete();
    // Forward payment information to bank
    console.log(paymentResponse.details); // CC #, name, security code, expiration date, etc.
        }
    }
}
/************************* Buy Event End *************************/

/************************* Pop-Up Open Link Start *************************/
let pop_up_info=document.querySelector('.pop-up-info');
let contract_links=document.getElementsByClassName('contract-link');

for(let i=0;i<contract_links.length;i++){
    contract_links[i].addEventListener('click',()=>{
        pop_up_info.classList.replace('hide','show');
    })
}
/************************* Pop-Up Open Link End *************************/

/************************* Pop-Up Close Button Start *************************/

let pop_up_close=document.getElementById('pop-up-close');
pop_up_close.addEventListener('click',function(){

    pop_up_info.classList.replace('show','hide');

})
/************************* Pop-Up Close Button End *************************/

/*************************  Pop-Up Confirm Button Start ************************ */
let btn_confirm=document.querySelector('.btn-confirm');

btn_confirm.addEventListener('click',function(){

    pay_check.checked=true

    if(pay_check.checked){
        for(let i=0;i<btn_pay.length;i++){
            btn_pay[i].classList.replace('disabled','enabled');
        }
    }


    pop_up_info.classList.replace('show','hide');

})
/*************************  Pop-Up Confirm Button End ************************ */

/*************************  Card-Number Space Start ************************ */
let card_number=document.querySelector('.card-number>input');

card_number.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
});
/*************************  Card-Number Space End ************************ */