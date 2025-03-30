import { DataTypes, Model, Optional, Sequelize, } from 'sequelize';

import { postgresModelNames } from '../constants';

import { IPromptAttributes, } from './models.interface';

interface IOptionalAttributes extends Optional<IPromptAttributes, 'id'> { }


class Prompt extends Model<IPromptAttributes, IOptionalAttributes> implements IPromptAttributes {
    declare id: number;
    declare name: string;
    declare promptModel: string;
    declare isVisible: boolean;
    declare isDeleted: boolean;
}

export const PromptFactory = (sequelize: Sequelize): typeof Prompt => {
    Prompt.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        promptModel: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        isVisible: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: postgresModelNames.PROMPT,
    });

    return Prompt;
};