
export function definePasswordRecovery(sequelize, DataTypes) {

    const PasswordRecovery = sequelize.define("PasswordRecovery", {
        recovery_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'password_recovery',
        timestamps: false,
    });

    return PasswordRecovery;
}