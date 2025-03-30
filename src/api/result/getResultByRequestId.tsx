import FileUpload from "../../types/fileUpload";
import axios, { isAxiosError } from "axios";
import Config from "../../config/Config";
import CheckElementList from "../../types/checkElementList";
import { toaster } from "~/components/ui/toaster";
import HandleError from "~/common/HandleError";

const getResultByRequestId = async (requestId: number): Promise<string> => {
    try {
        const response = await axios.get(
            `${Config.API.Server}/result/${requestId}`,
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
        return Promise.reject("get result failed");
    }
}

export default getResultByRequestId;

