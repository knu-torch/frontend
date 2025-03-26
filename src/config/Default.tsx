import Result from "../types/result";
import CheckElementList from "../types/checkElementList";
import FileUpload from "../types/fileUpload";

const Default: {
    Result: Result;
    CheckElementList: CheckElementList[];
    FileUpload: FileUpload[];
} = {
    Result: {
        requestId: "0",
        content: "결과값이 없습니다",
    },
    CheckElementList: [],
    FileUpload: [],
};

export default Default;
