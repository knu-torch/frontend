import FileUpload from "../../types/fileUpload";
import axios , { AxiosError } from "axios";
import Config from "../../config/Config";


const FileUploadByUserId = async (files: File[]) : Promise<string> => {
    try {
        const body = new FormData();
        files.forEach((file) => {
            body.append("file", file);
        });
    
        const response = await axios.post(
            `${Config.API.Server}/fileUpload`,
            body
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

