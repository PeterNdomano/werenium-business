import React from 'react';
import $ from 'jquery';
import { TailSpin } from 'react-loader-spinner';
import toast from 'siiimple-toast';
export function  hideLoader(){
  $('#mainLoader').fadeOut();
}

export function  showLoader(){
  $('#mainLoader').fadeIn();
}

export function getLoader(color = "var(--darkColor)"){
  return (
    <TailSpin
      width={20}
      height={20}
      color = {color}
      wrapperStyle={{
        width: "20px",
        height:"20px",
        padding: "0px",
        background:"none",
        margin: "0 auto"
      }}
    />
  );
}

export function validateNum(num){
  if(!isNaN(Number(num))){
    return true;
  }
  return false;
}

export function validateStr(str){
  if(str.trim().length > 0){
    return true;
  }
  return false;
}

export function tellUser(msg){

  toast.message(msg, {
    container: 'body',
    position: "bottom|right",
    margin: 15,
    style:{
       width: "300px",
       height: "auto",
       fontSize:"13px",
       position:"relative",
       overflow: "hidden",
     },
    delay: 0,
    duration: 3000,
  });
}

export function getStartIndex(batchSize, batchIndex){
  return (batchSize * batchIndex);
}

export function numberFormat(num, digits = 3){
  num = Number.parseFloat(num);
  const lookup = [
   { value: 1, symbol: "" },
   { value: 1e3, symbol: "K" },
   { value: 1e6, symbol: "M" },
   { value: 1e9, symbol: "B" },
   { value: 1e12, symbol: "T" },
   { value: 1e15, symbol: "P" },
   { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
