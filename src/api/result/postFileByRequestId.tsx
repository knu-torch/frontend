import axios, { isAxiosError } from "axios";
import Config from "../../config/Config";
import { toaster } from "~/components/ui/toaster";
import HandleError from "~/common/HandleError";

const postFileByRequestId = async (file: File, options: CheckElementList[]): Promise<string> => {
    try {
        const body = new FormData();
        body.append("project_file", file);
        const newOptions = options.reduce((acc, option) => {
            acc.push(option.value);
            return acc;
        }, [] as string[]);
        body.append("summary_options", JSON.stringify(newOptions));
        const response = await axios.post(
            `${Config.API.Server}`,
            body
        );

        const data = await response.data;
        console.log(data.request_id);
        return data.request_id;
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

