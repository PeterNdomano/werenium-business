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

export function getLoader(){
  return (
    <TailSpin
      width={50}
      height={50}
      color = "var(--primaryColor)"
      wrapperStyle={{
        width: "40px",
        height:"40px",
        padding: "0px",
        background:"none",
        margin: "0 auto"
      }}
    />
  );
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
