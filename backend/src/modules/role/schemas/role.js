
export function defineRole(sequelize, DataTypes) {

    const Role = sequelize.define("Role", {
        rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        timestamps: true,
        tableName: "roles"
    });

    return Role;
}