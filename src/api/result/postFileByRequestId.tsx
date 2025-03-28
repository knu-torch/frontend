import FileUpload from "../../types/fileUpload";
import axios, { AxiosError } from "axios";
import Config from "../../config/Config";
import CheckElementList from "../../types/checkElementList";

const postFileByRequestId = async (files:File[], checkElementList: CheckElementList[]): Promise<string> => {
    try {
        const body = new FormData();
        files.forEach((file) => {
            body.append("file", file);
        });
        body.append("checkElementList", JSON.stringify(checkElementList));
        console.log(body);
        const response = await axios.post(
            `${Config.API.Server}/result`,
            {
                body
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

export default postFileByRequestId;

