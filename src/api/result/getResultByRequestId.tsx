import axios from "axios";
import Config from "../../config/Config";
import { toaster } from "~/components/ui/toaster";

const getResultByRequestId = async (requestId: string): Promise<string> => {
    try {
        const response = await axios.get(
            `${Config.API.Server}/result/${requestId}`,
        );

        const data = await response.data;

        return data;
    } catch (error) {
        toaster.create({
            type: "error",
            title: "fetch error",
            description: "컨텐츠를 불러오는데 실패했습니다.",
        });
        return Promise.reject("get result failed");
    }
}

export default getResultByRequestId;

