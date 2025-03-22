import FileUpload from "../../types/fileUpload";
import axios , { AxiosError } from "axios";
import Config from "../../config/Config";


const FileUploadByUserId = async (files: File[], token: string) : Promise<FileUpload> => {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("file", file);
        });
    
        const response = await axios.put(
            `${Config.API.Server}/fileUpload`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    
        const data = await response.data;
    
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error;
        }
        throw new Error("Failed to upload file");
    }
}

export default FileUploadByUserId;

