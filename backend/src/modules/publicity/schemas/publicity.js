
export function definePublicity(sequelize, DataTypes) {
    const Publicity = sequelize.define('Publicity', {
        publicity_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'publicities',
    });

    return Publicity;
}
