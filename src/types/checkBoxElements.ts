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
    name: CheckBoxElements;
    type: CheckBoxElementListType;
}

export const DefaultCheckBoxElements: Record<CheckBoxElementListType, Array<Omit<CheckBoxElementListObject, 'type'>>> = {
    codeQuility: [
        { id: 1, name: "ProjectSummary" },
        { id: 2, name: "DirectorySummary" },
        { id: 3, name: "ClassSummary" }
    ]
};

export type { CheckBoxElements, CheckBoxElementListObject, CheckBoxElementListType };
