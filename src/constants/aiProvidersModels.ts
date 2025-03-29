import { TProvidersModels } from '../types';

const providersModels: TProvidersModels = {
    'anthropic': [
        {
            key: 'at0',
            name: 'claude-3-7-sonnet-20250219',
            isEnabled: true,
        }
    ],
    'openAI': [
        {
            key: 'gt0',
            name: 'gpt-3.5-turbo',
            isEnabled: true,
        },
        {
            key: 'gt1',
            name: 'gpt-4',
            isEnabled: true,
        },
        {
            key: 'gt2',
            name: 'gpt-4o-mini',
            isEnabled: true,
        },
        {
            key: 'gt3',
            name: 'gpt-4o',
            isEnabled: true,
        },
    ],
};

export default providersModels;