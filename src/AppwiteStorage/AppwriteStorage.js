import { Client , Storage } from "appwrite";
import confi from '../confi/confi'

export class StorageService{
    client = new Client();
    storage;

    constructor(){
        this.client
        .setEndpoint(confi.appwriteUrl)
        .setProject(confi.appwriteProjectId);

        this.storage = new Storage(this.client);
    }


    async getAllImages(){
       try{
            const allImages = await this.storage.listFiles(confi.appwriteBucketId);
            const data = {};

            allImages.files.forEach((urls) => {
                const name = urls.name;
                data[name] = this.storage.getFilePreview(confi.appwriteBucketId , urls.$id);
            });

            console.log("Getting List of Files is Done");

            return data;
       }
       catch(error){
        console.log("Error while getting files" , error);
        return ;
       }
    }
}


const storageService = new StorageService();

export default storageService;