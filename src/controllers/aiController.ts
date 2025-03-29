import { NextFunction, Request, Response } from 'express';

import { aiProvidersModels } from '../constants';

import { createPrompt, getAllPrompts, sendAiRequestToProvider, verifyPromptExist } from '../services/aiService';
import { ISendRequestConfig, TProvidersModels } from '../types';

const DEFAULT_MAX_TOKENS = 20;
// Anthropic 1024

export const getAiModels = (req: Request, res: Response, next: NextFunction) => {
    // for (const provider in aiProvidersModels) {
    //     const modelAi = aiProvidersModels[provider as keyof TProvidersModels];
    //     console.log("🚀 ~ getAiModels ~ modelAi:", modelAi)
    //     // Add filtering by "isEnabled"
    // }
    res.status(200).json(aiProvidersModels);
};

export const sendRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isPromptExits = await verifyPromptExist(req.body.promptId);
        if (!isPromptExits) {
            res.status(400).json({ message: 'sss' });
            return;
        }

        const config: Partial<ISendRequestConfig> = {
            model: undefined,
            provider: undefined,
            maxTokens: req?.body?.maxTokens || DEFAULT_MAX_TOKENS,
        };

        const body = req.body;
        for (const provider in aiProvidersModels) {
            const parsedProvider = provider as keyof TProvidersModels;

            const aiModel = aiProvidersModels[parsedProvider];
            const hasModel = aiModel.find(m => m.name === body.model);
            if (hasModel?.name) {
                config.model = hasModel.name;
                config.provider = parsedProvider;
            }
        }

        if (!config.model || !config.provider) {
            res.status(400).json({ message: 'Model doesn\'t found' });
            return;
        };
        const response = await sendAiRequestToProvider(config as ISendRequestConfig, body);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const createUserPrompt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await createPrompt(req.body);
        if (result.status !== 200) {
            res.status(400).json({ message: 'Incorrect' });
            return;
        }

        res.status(result.status).json(result.promptData);
    } catch (error) {
        next(error);
    }
};

export const getAllUserPrompts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllPrompts(req.params.userId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
