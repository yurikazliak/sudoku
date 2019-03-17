module.exports = function solveSudoku(matrix) {

  
  forManyPossibles(forOnePossible(matrix));

  function forOnePossible(array) {

    solutionEasy(array)

    function solutionEasy(array) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (array[row][col] == 0) {
            findValues(array, row, col);
            if (findValues(array, row, col).length == 1) {
              array[row][col] = findValues(array, row, col)[0];
              solutionEasy(array);
            }
          }
        }
      } return array;
    }

    function findValues(array, row, col) {
      let allValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < 9; i++) {
        for (let val = 0; val < allValues.length; val++) {
          if (array[row][i] == allValues[val]) {
            allValues.splice(val, 1);
          }
        }
      }
      if (allValues.length == 1) {
        return allValues;
      } else {
        for (let j = 0; j < 9; j++) {
          for (let val = 0; val < allValues.length; val++) {
            if (array[j][col] == allValues[val]) {
              allValues.splice(val, 1);
            }
          }
        }
        if (allValues.length == 1) {
          return allValues;
        } else {
          let blockRowStart = 3 * (Math.floor(row / 3));
          let blockColStart = 3 * (Math.floor(col / 3));
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              for (let val = 0; val < allValues.length; val++) {
                if (array[blockRowStart + r][blockColStart + c] == allValues[val]) {
                  allValues.splice(val, 1);
                }
              }
            }
          }
        }
      } return allValues;
    }
    return array;
  } 
  function forManyPossibles(array) {

    function solutionHard(array) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (array[row][col] == 0) {
            for (let v = 0; v < findValues(array, row, col).length; v++) {
              let possibleNumber = findValues(array, row, col)[v];
              if (!findDoubles(array, row, col, possibleNumber)) {
                array[row][col] = possibleNumber;
                if (solutionHard(array)) {
                  return true;
                } else {
                  array[row][col] = 0;
                }
              }
            } return false;
          }
        }
      } return true;
    }

    function findValues(array, row, col) {
      let allValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < 9; i++) {
        for (let val = 0; val < allValues.length; val++) {
          if (array[row][i] == allValues[val]) {
            allValues.splice(val, 1);
          }
        }
      }
      if (allValues.length == 1) {
        return allValues;
      } else {
        for (let j = 0; j < 9; j++) {
          for (let val = 0; val < allValues.length; val++) {
            if (array[j][col] == allValues[val]) {
              allValues.splice(val, 1);
            }
          }
        }
        if (allValues.length == 1) {
          return allValues;
        } else {
          let blockRowStart = 3 * (Math.floor(row / 3));
          let blockColStart = 3 * (Math.floor(col / 3));
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              for (let val = 0; val < allValues.length; val++) {
                if (array[blockRowStart + r][blockColStart + c] == allValues[val]) {
                  allValues.splice(val, 1);
                }
              }
            }
          }
        }
      } return allValues;
    }

    function findDoubles(array, row, col, possibleNumber) {
      for (let i = 0; i < 9; i++) {
        if ((array[row][i] == possibleNumber)) {
          return true;
        }
      }
      for (let j = 0; j < 9; j++) {
        if ((array[j][col] == possibleNumber)) {
          return true;
        }
      }
      let blockRowStart = 3 * (Math.floor(row / 3));
      let blockColStart = 3 * (Math.floor(col / 3));
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((array[blockRowStart + r][blockColStart + c] == possibleNumber)) {
            return true;
          }
        }
      } return false;
    }

    if (solutionHard(array)) {
      return array;
    }

  }
  return matrix;
}
