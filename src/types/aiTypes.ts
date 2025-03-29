export type TAiModels = 'claude-3-7-sonnet-20250219' | 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4o-mini' | 'gpt-4o';
export type TAiProviders = 'anthropic' | 'openAI';

export interface ISendRequestConfig {
    model: TAiModels;
    provider: TAiProviders;
    maxTokens: number;
};

interface IProviderModel {
    key: string;
    name: TAiModels;
    isEnabled: boolean;
};

export type TProvidersModels = {
    [key in TAiProviders]: IProviderModel[];
}

export type TProviders = {
    [key in TAiProviders]: Function;
}

export interface IMessageType {
    role: "user";
    content: string
}