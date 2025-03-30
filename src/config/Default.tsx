import Result from "../types/result";
import CheckElementList from "../types/checkElementList";
import FileUpload from "../types/fileUpload";
import {CheckBoxElementListObject ,CheckBoxElements ,CheckBoxElementListType} from "../types/checkBoxElements";

const Default: {
    Result: Result;
    CheckElementList: CheckElementList[];
    FileUpload: FileUpload[];
    CheckBoxElementListObject: CheckBoxElementListObject[];
} = {
    Result: {
        requestId: "0",
        content: "결과값이 없습니다",
    },
    CheckElementList: [],
    FileUpload: [],
    CheckBoxElementListObject: [
        {
            id: 1,
            value: "ProjectSummary",
            type: "codeQuility",
        },
        {
            id: 2,
            value: "DirectorySummary",
            type: "codeQuility",
        }
    ],
};

export default Default;
