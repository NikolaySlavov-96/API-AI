// SQL Models
export interface IPromptAttributes {
    id: number;
    name: string;
};

export interface IUserAttributes {
    id: number;
    email: string;
    password: string;
};

export interface IMessageAttributes {
    id: number;
    content: string;
    role: string;
    tokenCost: string;
};

export interface IPromptCostAttributes {
    promptId: number;
    totalInputCost: number;
    totalOutputCost: number;
};

export interface IPromptMessageAttributes {
    id: number;
    promptId: number;
    messageId: number;
};

export interface IUserPromptAttributes {
    userId: number;
    promptId: number;
};