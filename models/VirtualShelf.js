const { Model, DataTypes } = require("sequelize");

// Definirea primei entitati
// entitatea raft
module.exports = (sequelize, DataTypes) => {
    class VirtualShelf extends Model {
        // definirea relatiei dintre cele doua entitati - one to many
        static associate(models) {
            // un raft are mai multe carti
            models.VirtualShelf.hasMany(models.Book);
        }
    }
    VirtualShelf.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true

            },
            description: DataTypes.STRING,
            creationDate: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "VirtualShelf",
        }
    );
    return VirtualShelf;
};
