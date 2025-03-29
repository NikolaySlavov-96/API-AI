import { DataTypes, Model, Optional, Sequelize, } from 'sequelize';

import { postgresModelNames } from '../constants';

import { IPromptCostAttributes, } from './models.interface';


class PromptCost extends Model<IPromptCostAttributes> implements IPromptCostAttributes {
    declare promptId: number;
    declare totalInputCost: number;
    declare totalOutputCost: number;
}

export const PromptCostFactory = (sequelize: Sequelize): typeof PromptCost => {
    PromptCost.init({
        promptId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        totalInputCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalOutputCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: postgresModelNames.PROMPT_COST,
    });

    return PromptCost;
};