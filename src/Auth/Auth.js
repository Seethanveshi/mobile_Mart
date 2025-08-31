import { Client , Account , ID } from "appwrite";
import confi from '../confi/confi'
import { combineSlices } from "@reduxjs/toolkit";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(confi.appwriteUrl)
        .setProject(confi.appwriteProjectId)

        this.account = new Account(this.client);
    }


    async createAccount({Email , Password , Name}){

        try{
            const userAccount = await this.account.create(ID.unique() , Email , Password , Name);
            if (userAccount) {
                return this.loginUser({Email , Password});
            } else {
                return userAccount;
            }            
        } 
        catch(error){
            throw error;
        }

    }

    async loginUser({Email , Password}){

        try{
            const user = await this.account.get()
            if(user) {
                await this.account.deleteSession('current');
                localStorage.removeItem('auth');
            }
        }

        catch(error){
            console.warn("Error while logout current user" , error);
        }

        try{
            await this.account.createEmailPasswordSession(Email , Password);
            console.log("Logined Successfully");
        } 
        catch(error){
            console.log("APPWRITE Login Error : " , error);
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        } 
        catch(error){
            console.log("APPWRITE getCurrentUser Error : " , error);
            throw error;
        }

        return ;
    }

    async logOut(){
        try{
            return await this.account.deleteSession('current'); 
        } 
        catch(error){
            console.log("APPWRITE logOut Error : " , error);
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService;