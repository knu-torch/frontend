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

export const DefaultCheckBoxElements: Record<CheckBoxElementListType, Array<Omit<CheckBoxElementListObject, 'type'>>> = {
    codeQuility: [
        { id: 1, name: "ProjectSummary" },
        { id: 2, name: "DirectorySummary" },
        { id: 3, name: "ClassSummary" }
    ]
};
