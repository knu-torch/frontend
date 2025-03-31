import axios, { isAxiosError } from "axios";
import Config from "../../config/Config";
import CheckElementList from "../../types/checkElementList";
import { toaster } from "~/components/ui/toaster";
import HandleError from "~/common/HandleError";

const postFileByRequestId = async (file:File, options: CheckElementList[]): Promise<string> => {
    try {
        const body = new FormData();
        body.append("file", file);
        body.append("checkElementList", JSON.stringify(options));                  
        console.log(body);
        const response = await axios.post(
            `${Config.API.Server}/result`,
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
                title: "post file error",
                description: "파일 업로드에 실패하였습니다.",
            });
        }
        return Promise.reject("post file failed");
    }
}

export default postFileByRequestId;

