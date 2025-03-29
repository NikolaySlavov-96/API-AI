import { DataTypes, Model, Optional, Sequelize, } from 'sequelize';

import { postgresModelNames } from '../constants';

import { IPromptAttributes, } from './models.interface';

interface IOptionalAttributes extends Optional<IPromptAttributes, 'id'> { }


class Prompt extends Model<IPromptAttributes, IOptionalAttributes> implements IPromptAttributes {
    declare id: number;
    declare name: string;
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
    }, {
        sequelize,
        tableName: postgresModelNames.PROMPT,
    });

    return Prompt;
};