import axios , { isAxiosError } from "axios";
import Config from "../../config/Config";
import { toaster } from "~/components/ui/toaster";
import HandleError from "~/common/HandleError";

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
        if (isAxiosError(error)) {
            HandleError(error);
        } else {
            toaster.create({
                type: "error",
                title: "fetch error",
                description: "서버와의 통신에 실패하였습니다.",
            });
        }
        return Promise.reject("fetch failed");
    }
}

export default FileUploadByUserId;

