import { aiProvidersModels } from "../constants";

import { ISendRequestConfig, TAiModels, TProvidersModels } from "../types";


const DEFAULT_MAX_TOKENS = 1500;

export const _mapModelToProviderConfig = (model: TAiModels, tokens?: number) => {
    const config: Partial<ISendRequestConfig> = {
        model,
        provider: undefined,
        maxTokens: tokens || DEFAULT_MAX_TOKENS,
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