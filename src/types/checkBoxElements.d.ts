type CheckBoxElements =
    | "ProjectSummary"
    | "DirectorySummary"
    | "ClassSummary"
    | "FunctionSummary"
    | "VariableSummary"
    | "VariableDeclaration"
    | "VariableAssignment"
    | "VariableUsage"
    | "VariableInitialization"
    | "VariableDeclaration"
    | "VariableAssignment"
    | "FileSummary";

type CheckBoxElementListType = "codeQuility";


type CheckBoxElementListObject = {
    codeQuility: Array<{
        id: string;
        name: CheckBoxElements;
    }>;
}

