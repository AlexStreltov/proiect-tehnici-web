const { Model, DataTypes } = require("sequelize");

// Definirea celei de-a doua entitati
// entitatea Book
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(models) {
            // definirea relatiei dintre cele doua entitati - one to many
            models.Book.belongsTo(models.VirtualShelf, {
                // o carte apartine unui raft
                foreignKey: "shelfId",
            });
        }
    }
    Book.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: DataTypes.STRING,
            genre: DataTypes.ENUM(['COMEDY', 'TRAGEDY', 'ADVENTURE', 'MISTERY']),
            url: DataTypes.STRING,
            shelfId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Book",
        }
    );
    return Book;
};
