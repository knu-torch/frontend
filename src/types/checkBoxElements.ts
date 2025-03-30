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
    id: number;
    value: CheckBoxElements;
    type: CheckBoxElementListType;
}

export const DefaultCheckBoxElements: Record<CheckBoxElementListType, Array<Omit<CheckBoxElementListObject, 'type'>>> = {
    codeQuility: [
        { id: 1, value: "ProjectSummary" },
        { id: 2, value: "DirectorySummary" },
        { id: 3, value: "ClassSummary" }
    ]
};

export type { CheckBoxElements, CheckBoxElementListObject, CheckBoxElementListType };
