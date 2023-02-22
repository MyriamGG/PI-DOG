const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('image', {
    reference_image_id: {
      type: DataTypes.STRING,
      defaultValue: " ",
      allowNull: false,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {timestamps: false},
  );
};
