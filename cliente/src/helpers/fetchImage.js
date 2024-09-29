export const uploadImageCloudinary = async (image) => {
    const urlAPI = `https://api.cloudinary.com/v1_1/dabdlceqg/image/upload`;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'gempro');

    const response = await fetch(urlAPI, {
        method: 'post',
        body: formData
    });

    return response.json();
};
