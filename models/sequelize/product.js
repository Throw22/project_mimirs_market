'use strict';
module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define('Car', {
      year: {
        type: DataTypes.INTEGER,
        validate: { min: 1900, max: 2100 }
      },
      model: {
        type: DataTypes.STRING,
        validate: {
          isalphanumeric: {
            msg: 'Model must be alphanumeric'
          }
        }
      },
      owner: {type: DataTypes.ARRAY(Data.Types.STRING)},
    {
      classMethods: {}
    }
    }
  );
  return Car;
};
