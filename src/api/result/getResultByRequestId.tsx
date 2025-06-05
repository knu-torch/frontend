import axios from "axios";
import Config from "~/config/Config";
import { toaster } from "~/components/ui/toaster";

const getResultByRequestId = async (
    requestId: string
): Promise<[Blob, string]> => {
    try {
        const response = await axios.get(
            `${Config.API.Server}/download/${requestId}`,
            {
                responseType: "blob",
            }
        );

        const data = await response.data;
        console.log(response.headers);
        return [data, response.headers["status"]];
    } catch (error) {
        toaster.create({
            type: "error",
            title: "fetch error",
            description: "컨텐츠를 불러오는데 실패했습니다." + error,
        });
        return Promise.reject("get result failed");
    }
};

export default getResultByRequestId;
