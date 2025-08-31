import { Client , Databases , ID , Query} from "appwrite";
import confi from "../confi/confi";
import authService from "../Auth/Auth";

export class DatabaseService{
    client = new Client();
    database;

    constructor(){
        this.client
        .setEndpoint(confi.appwriteUrl)
        .setProject(confi.appwriteProjectId);

        this.database = new Databases(this.client);
    }


    // async addToDatabase({Name , Price , ImageUrl , ModelNo , Highlights , Specifications , KeyValues}) {
    //     try{
    //         const data = await this.database.createDocument(
    //             confi.appwriteDatabaseId,
    //             confi.appwriteCollectionId,
    //             ID.unique(),
    //             {
    //                 Name,
    //                 Price,
    //                 Highlights,
    //                 ImageUrl,
    //                 Specifications,
    //                 KeyValues,
    //                 ModelNo,
    //             }
    //         )

    //         console.log("Document creation is done" , Name);
    //         return ;
            
    //     }
    //     catch(error) {
    //         console.error("Document creation is not done")
    //         throw error;
    //     }
    // }

    async getData(id){
        try{
            const data = await this.database.getDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                id
            )

            console.log("Getting document is done");
            return data;
        }
        catch(error){
            console.error("Unabel to get Document");
            throw error;
        }
    }

    async getAlldata(){
        try{
            const result = await this.database.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                [
                    Query.limit(100)
                ]
            )
            console.log("Getting all data is Done");
            return result.documents;
        }
        catch(error){
            console.log("Error While Getting All Data" , error);
            return ;
        }
    }

    // async update(Object){
    //     try{

    //         console.log("Update Done");
    //     }
    //     catch(error){
    //         console.error("Error While update" , error);
    //         return ;
    //     }
    // }

    async getCategoryMobiles(CategoryName , Category){
        try{
            const result = await this.database.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,

                [Query.equal(CategoryName , Category)]
            );
            
            console.log("Getting data Done");
            return result.documents;
        }
        
        catch (error) {
            console.error("Error While getting data" , error);
            return ;
        }
    }

    async addToCart(mobile){
        try {
            
            const UserId = await authService.getCurrentUser();

            const data = await this.database.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCartCollectionId,
                mobile.$id,
                {
                    UserId : UserId.$id,
                    Name : mobile.Name,
                    Price : mobile.Price,
                    ImageUrl : mobile.ImageUrl,
                    ModelNo : mobile.ModelNo,
                    Brand : mobile.Brand,
                    Rating : mobile.Rating,
                    Highlights : mobile.Highlights,
                    Specifications : mobile.Specifications,
                    KeyValues : mobile.KeyValues,
                    MRP : mobile.MRP,
                }
            )

            console.log("Updating Data to Cart is done");
            return data;
        } 
        
        catch(error){
            console.error("Error while Updating data to Cart : " , error);
            return ;
        }
    }

    async getDataFromCart(){

        try {
            const UserId = await authService.getCurrentUser();

            const result = await this.database.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCartCollectionId,
                [Query.equal('UserId' , UserId.$id)],
            )

            console.log(result);
            
            return result.documents;

        }
        
        catch(error) {
            console.error("Error While Getting Data from Cart" , error);
            return ;
        }
    }

    async updateQuantity({val , ID}){
        try{
            
            const UserId = await authService.getCurrentUser();

            if(val==0){
                await this.deleteItem(ID);
                return ;
            }

            console.log(ID);

            await this.database.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCartCollectionId,
                ID,
                {
                    Quantity : val,
                }
            )

            console.log("Updating Quatity Done");
            return ;
        }
        catch(error){
            console.error("Error While Updating Quantity" , error);
            return ;
        }
    }

    async deleteItem(ID){

        const UserId = await authService.getCurrentUser();

        try {
            await this.database.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCartCollectionId,
                ID
            )
            console.log("Deleting CartItem is Done");
            return;
        }
        catch(error) {
            console.error("Error While Deleting CartItem" , error);  
            return ; 
        }
    }

    async getWishlist(){
        try {
            const UserId = await authService.getCurrentUser();
            
            const data = await this.database.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteWishlistCollectionId,
                [Query.equal('UserId' , UserId.$id)],
            )
            console.log('Getting Wishlist data done');

            return data.documents;
        }

        catch(error){
            console.log('Error While Getting data from wishlist' , error);
            return ;
        }
    }

    async addToWishlist(mobile){

        try{
            const UserId = await authService.getCurrentUser();

            await this.database.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteWishlistCollectionId,
                mobile.$id,
                {
                    Name : mobile.Name,
                    Price : mobile.Price,
                    MRP : mobile.MRP,
                    Rating : mobile.Rating,
                    ImageUrl : mobile.ImageUrl,
                    Highlights : mobile.Highlights,
                    UserId : UserId.$id,
                    ProductId : mobile.$id
                }
            )

            console.log('Added to wishList done');
            return ;
        }
        catch(error){
            console.warn('Error while adding into Wishlist' , error);
            return;
        }
    }

    async deleteFromWishlist(Id){
        
        console.log(Id);

        try {
            await this.database.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteWishlistCollectionId,
                Id
            )
            console.log('Delete from Wishlist done');
            return;
        }
        catch(error){
            console.log('Error While Deleting from WishList' , error);
            return ;
        }
    }

    async addAddress(Address){
        try{
            const UserId = await authService.getCurrentUser();

            await this.database.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteAddressCollectionId,
                ID.unique(),
                {
                    UserId : UserId.$id,
                    Name : Address.Name,
                    MobileNumber : Address.MobileNumber,
                    Address : Address.Address,
                    City : Address.City,
                    LandMark : Address.LandMark,
                    State : Address.State,
                    District : Address.District,
                    Pincode : Address.Pincode
                }
            )
            console.log("Address Upload is Done");
            return Address;
        }
        catch(error){
            console.error("Error While Uploading Address" , error);
        }
    }

    async getAllAddresses(){
        try{

            const UserId = await authService.getCurrentUser();

            const result = await this.database.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteAddressCollectionId,
                [Query.equal('UserId' , UserId.$id)],
            )

            console.log("getting Address Done");

            return result.documents;
        }
        catch(error){
            console.error("Error While Getting data" , error);
            return ;
        }
    }

    async deleteAddress(ID){
        try{
            await this.database.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteAddressCollectionId,
                ID
            )

            console.log("Delete Address is Done");
            return ;
        }

        catch(error){
            console.error("Error While Deleting Address" , error);
            return ;
        }
    }


    async getOrderedItems(){
        try{

            const UserId = await authService.getCurrentUser();

            const result = await this.database.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteOrderedCollectionId,
                [Query.equal('UserId' , UserId.$id)],
            )
            console.log("Getting Ordered Data Done");
            return result.documents;
        }
        catch(error){
            console.error("Error While Getting Ordered Data" , error);
            return;
        }
    }

    async addOrderedItems(data){
        try{

            const UserId = await authService.getCurrentUser();

            await this.database.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteOrderedCollectionId,
                ID.unique(),
                {
                    UserId : UserId.$id,
                    Name : data.Name,
                    Brand : data.Brand,
                    ModelNo : data.ModelNo,
                    MRP : data.MRP,
                    Price : data.Price,
                    ImageUrl : data.ImageUrl,
                    Rating : data.Rating,
                    Quantity : data.Quantity,
                    personName : data.personName,
                    personMobileNumber : data.personMobileNumber,
                    Address : data.Address,
                    DeliveryDate : data.DeliveryDate,

                }
            )
            console.log("Uploading Ordered data is Done");
            return ;
        } 
        catch(error){
            console.error("Error While Uploading Ordered Data" , error);
            return ;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;