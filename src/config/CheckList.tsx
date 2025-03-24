
const CheckList = {
    ProjectSummary: "ProjectSummary",
    DirectorySummary: "DirectorySummary",
    ClassSummary: "ClassSummary",
    FunctionSummary: "FunctionSummary",
    VariableSummary: "VariableSummary",
    CommentSummary: "CommentSummary",
    CodeQuality: "CodeQuality",
    CodeDuplication: "CodeDuplication",
    CodeComplexity: "CodeComplexity",
    CodeReadability: "CodeReadability",
    CodeMaintainability: "CodeMaintainability",
}

const CheckListMap = {
    [CheckList.ProjectSummary]: {title: "프로젝트 요약", description: "프로젝트 요약"},
    [CheckList.DirectorySummary]: {title: "디렉토리별 요약", description: "디렉토리별 요약"},
    [CheckList.ClassSummary]: {title: "클래스별 요약", description: "클래스별 요약"},
    [CheckList.FunctionSummary]: {title: "함수 요약", description: "함수 요약"},
    [CheckList.VariableSummary]: {title: "변수 요약", description: "변수 요약"},
    [CheckList.CommentSummary]: {title: "주석 요약", description: "주석 요약"},
    [CheckList.CodeQuality]: {title: "코드 품질", description: "코드 품질"},
    [CheckList.CodeDuplication]: {title: "코드 중복", description: "코드 중복"},
    [CheckList.CodeComplexity]: {title: "코드 복잡도", description: "코드 복잡도"},
    [CheckList.CodeReadability]: {title: "코드 가독성", description: "코드 가독성"},
    [CheckList.CodeMaintainability]: {title: "코드 유지보수", description: "코드 유지보수"},
}

export { CheckList, CheckListMap };
