

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
        nombre_completo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cedula : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        suscripcion: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        image_perfil: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: true,
        tableName: "users"
    });

    return User;
}