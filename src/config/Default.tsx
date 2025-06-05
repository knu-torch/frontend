const Default: {
    Result: Result;
    CheckElementList: CheckElementList[];
    FileUpload: FileUpload[];
    CheckBoxElementListObject: CheckBoxElementListObject;
    CheckBoxAllList: CheckElementList[];
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
                id: "1",
                name: "ProjectSummary"
            },
            {
                id: "2",
                name: "DirectorySummary"
            },
            {
                id: "3",
                name: "FunctionSummary"
            },
            {
                id: "4",
                name: "FileSummary"
            },
        ]
    },
    CheckBoxAllList: [
        {
            id: "1",
            name: "ProjectSummary"
        },
        {
            id: "2",
            name: "DirectorySummary"
        },
        {
            id: "3",
            name: "FunctionSummary"
        },
        {
            id: "4",
            name: "FileSummary"
        },
        
    ]

};

export default Default;
