import { NextFunction, Request, Response, } from '../types';

import { aiProvidersModels } from '../constants';

import { createPrompt, getAllPrompts, sendAiRequestToProvider, verifyOwnerOnPrompt, verifyPromptExist } from '../services/aiService';

import { mapModelToProviderConfig } from '../utils';

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
        const promptId = req.body.promptId;
        const promptData = await verifyPromptExist(promptId);
        if (!promptData) {
            res.status(400).json({ message: 'Prompt doesn\'t exit!' });
            return;
        }

        const isOwnerOnPrompt = await verifyOwnerOnPrompt(promptId, req?.user?.userId ?? '');
        if (!isOwnerOnPrompt) {
            res.status(400).json({ message: 'You are not a owner' })
            return;
        }

        const body = req.body;
        const aiConfig = mapModelToProviderConfig(promptData.promptModel, body.maxTokens);

        if (!aiConfig.model || !aiConfig.provider) {
            res.status(400).json({ message: 'Model doesn\'t found' });
            return;
        };

        const response = await sendAiRequestToProvider(aiConfig, body);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const createUserPrompt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        const aiConfig = mapModelToProviderConfig(body.model, body.maxTokens);
        if (!aiConfig.model || !aiConfig.provider) {
            res.status(400).json({ message: 'This model doesn\'t supported' });
            return;
        }

        const promptName = body.promptName;
        const result = await createPrompt(aiConfig, promptName, req?.user?.userId ?? '');
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
