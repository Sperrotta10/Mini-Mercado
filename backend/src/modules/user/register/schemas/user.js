

export function defineUser(sequelize, DataTypes){

    const User = sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'rol_id'
            }
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        nombre_completo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cedula : {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        suscripcion: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        image_perfil: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: "users",
        indexes: [
            {
                unique: true,
                fields: ['email'],
                name: 'idx_user_email_unique'
            },
            {
                unique: true,
                fields: ['username'],
                name: 'idx_user_username_unique'
            },
            {
                unique: true,
                fields: ['cedula'],
                name: 'idx_user_cedula_unique'
            },
            {
                unique: true,
                fields: ['googleId'],
                name: 'idx_user_googleId_unique'
            }
        ]
    });

    return User;
}