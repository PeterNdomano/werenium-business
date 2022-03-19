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

export function numberFormat(num){
  return num;
}
