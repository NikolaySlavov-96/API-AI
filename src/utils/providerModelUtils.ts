import { aiProvidersModels } from "../constants";

import { ISendRequestConfig, TAiModels, TProvidersModels } from "../types";


const DEFAULT_TOKENS = 1500;
const MAX_ALLOWED_TOKEN = 4000

export const _mapModelToProviderConfig = (model: TAiModels, tokens?: number) => {
    const maxAllowedTokens = Math.min(tokens || DEFAULT_TOKENS, MAX_ALLOWED_TOKEN)

    const config: Partial<ISendRequestConfig> = {
        model,
        provider: undefined,
        maxTokens: maxAllowedTokens,
    };

    for (const provider in aiProvidersModels) {
        const parsedProvider = provider as keyof TProvidersModels;

        const aiModel = aiProvidersModels[parsedProvider];
        const hasModel = aiModel.find(m => m.name === model);
        if (hasModel?.name) {
            config.provider = parsedProvider;
        }
    }

    return config as ISendRequestConfig;
};