import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverterApp extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    countryList = countryCodeList
    countryFrom = "USD"
    countryTo = "AUD"
    amount =''
    result
    error 

    handleChange(event){
        const {name, value} = event.target;
        console.log("name", name);
        console.log("value", value);
        this[name] = value;
        this.result=''
        this.error =''
    }

    submitHandler(event){
        event.preventDefault();
        this.convert();
      }

      async convert(){
        const API_KEY = '3066fc27a956b357249047e1'
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`
        try{
          const data = await fetch(API_URL)
          const jsonData = await data.json()
          debugger;
          // this.result = (Number(this.amount) * jsonData.result).toFixed(2)
          this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
          console.log('result', this.result);
        } catch(error){
          console.log(error);
          this.error="An error occurred. Please try again...";
        }
      }
}