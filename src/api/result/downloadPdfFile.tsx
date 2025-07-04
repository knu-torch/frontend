import axios from 'axios';
// import { saveAs } from 'file-saver';
import Config from '~/config/Config';
import { toaster } from '~/components/ui/toaster';

const downloadPdfFile = async (requestId: string) => {
    try {
        const response = await axios.get(`${Config.API.Server}/download/${requestId}`, {
            responseType: 'blob'
        });
        console.log(response);
        // const fileName = 'result.pdf';
        // saveAs(response.data, fileName);

    } catch (error) {
        toaster.create({
            type: "error",
            title: "download error",
            description: "다운로드에 실패하였습니다.",
        });
        return Promise.reject("get pdf file failed");
    }
};

export default downloadPdfFile;

