import { Router, } from 'express';

import { sendRequest, getAiModels, createUserPrompt, getAllUserPrompts, getPromptMessagesById } from '../controllers/aiController';

const ai = Router();

ai.get('/models',
    getAiModels,
);

ai.post('/request',
    sendRequest,
);

ai.post('/prompt',
    createUserPrompt,
);

//
ai.get('/prompts/:userId',
    getAllUserPrompts,
);

ai.get('/promptMessages/:promptId',
    getPromptMessagesById,
);

export default ai;