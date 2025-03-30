import { AxiosError } from "axios";
import { toaster } from "~/components/ui/toaster";

const HandleError = (response: AxiosError<unknown, unknown>) => {
    switch (response.status) {
        case 400:
            toaster.create({
                title: "Bad Request",
                description: `잘못된 요청입니다. ${response.request.responseURL}`,
                type: "error",
            });
            break;
        case 401:
            toaster.create({
                title: "Bad Request",
                description: "인증 정보가 일치하지 않습니다. 로그인해주세요.",
                type: "error",
            });
            break;
        case 404:
            toaster.create({
                title: "Not found",
                description: "리소스를 찾을 수 없습니다.",
                type: "error",
            });
            break;

        case 500:
            toaster.create({
                title: "Internal Server Error",
                description: "서버 문제 입니다. 관리자에게 문의해주세요.",
                type: "error",
            });
            break;

        default:
            toaster.create({
                title: "Internal Server Error",
                description: `(axios error) code: ${response.code} message: ${response.message}`,
                type: "error",
            });
            break;
    }
};

export default HandleError;
