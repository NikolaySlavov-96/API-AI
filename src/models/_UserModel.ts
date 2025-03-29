import { DataTypes, Model, Optional, Sequelize, } from 'sequelize';

import { postgresModelNames } from '../constants';

import { IUserAttributes, } from './models.interface';

interface IOptionalAttributes extends Optional<IUserAttributes, 'id'> { }


class User extends Model<IUserAttributes, IOptionalAttributes> implements IUserAttributes {
    declare id: number;
    declare email: string;
    declare password: string;
}

export const UserFactory = (sequelize: Sequelize): typeof User => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(80),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(60),
        },
    }, {
        sequelize,
        tableName: postgresModelNames.USER,
    });

    return User;
};