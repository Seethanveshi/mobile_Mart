import storageService from "../AppwriteStorage";


export let ImageUrlData = {};

export const getDetails = async () => {
    ImageUrlData = await storageService.getAllImages();

    console.log(ImageUrlData);
}
