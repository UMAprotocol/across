// import React from "react";
import Onboard from "bnc-onboard";
import { Wallet, Initialization } from "bnc-onboard/dist/src/interfaces";
import { ethers } from "ethers";
import { onboardBaseConfig } from "utils";
import { update,disconnect,error } from "state/connection";
import {store} from 'state'

export type Emit = (event:string, data?:any) => void
export function OnboardReact(config:Initialization, emit:Emit){
  const onboard = Onboard({
    ...config,
    subscriptions: {
      address: (address: string) => {
        emit('update',{ account: address });
      },
      network: (chainIdInHex) => {
        if (chainIdInHex == null) {
          return;
        }
        const chainId = ethers.BigNumber.from(chainIdInHex).toNumber();

        emit('update',{ chainId });
      },
      wallet: (wallet: Wallet) => {
        const provider = new ethers.providers.Web3Provider(wallet.provider);
        const signer = provider.getSigner();
        emit('update',{
          account: wallet.provider.selectedAddress,
          provider,
          signer,
        });
      },
    },
  })
  async function init(){
    try{
    await onboard.walletSelect();
    await onboard.walletCheck();
      emit('init')
    }catch(err:any){
      emit('error',new Error("Could not initialize Onboard: " + err.message as string)) 
    }
  }
  async function reset(){
    try{
      await onboard.walletReset();
      emit('disconnect')
    }catch(err){
      emit('error',err)
    }
  }
  return { init, reset, onboard };
}
export const onboard = OnboardReact(onboardBaseConfig(),(event,data)=>{
  if(event === 'update'){
    store.dispatch(update(data))
  }
  if(event === 'disconnect'){
    store.dispatch(disconnect())
  }
  if(event === 'error'){
    store.dispatch(error(data))
  }
})
