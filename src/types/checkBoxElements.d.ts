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
    | "VariableAssignment";

type CheckBoxElementListType = "codeQuility";


type CheckBoxElementListObject = {
    codeQuility: Array<{
        id: number;
        name: CheckBoxElements;
    }>;
}

