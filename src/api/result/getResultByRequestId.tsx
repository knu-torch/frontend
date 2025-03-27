import FileUpload from "../../types/fileUpload";
import axios, { AxiosError } from "axios";
import Config from "../../config/Config";
import CheckElementList from "../../types/checkElementList";

const getResultByRequestId = async (requestId: number): Promise<string> => {
    try {
        const response = await axios.get(
            `${Config.API.Server}/result/${requestId}`,
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

export default getResultByRequestId;

