import { CheckBoxElementListObject } from "../types/checkBoxElements";

const Default: {
    Result: Result;
    CheckElementList: CheckElementList[];
    FileUpload: FileUpload[];
    CheckBoxElementListObject: CheckBoxElementListObject;
} = {
    Result: {
        requestId: "0",
        content: "결과값이 없습니다",
    },
    CheckElementList: [],
    FileUpload: [],
    CheckBoxElementListObject: {
        codeQuility: [
            {
                id: 1,
                name: "ProjectSummary"
            },
            {
                id: 2,
                name: "DirectorySummary"
            }
        ]
    }

};

export default Default;
