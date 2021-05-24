const mutantCheck = module.exports

const rightDiagonal = (matrix) => {
  var s, x, y, d,
    o = [];
  for (s = 0; s < matrix.length; s++) {
    d = [];
    for (y = s, x = 0; y >= 0; y--, x++)
      d.push(matrix[y][x]);
    o.push(d);
  }
  for (s = 1; s < matrix[0].length; s++) {
    d = [];
    for (y = matrix.length - 1, x = s; x < matrix[0].length; y--, x++)
      d.push(matrix[y][x]);
    o.push(d);
  }
  return o.map((array) => {
    return array.join('')
  });
}

const leftDiagonal = (matrix) => {
  let reverse = reverseMatrix(matrix)
  return rightDiagonal(reverse)
}

const reverseString = (string) => {
  return string.split("").reverse().join("");
}

const reverseMatrix = (matrix) => {
  return matrix.map((string) => {
    return reverseString(string);
  });
}

const findMutant = function (matrix) {

  let regex = /([ATGC])\1{3,4}/;

  let straight = matrix.filter((string) => {
    return regex.test(string);
  });

  let right = rightDiagonal(matrix).filter((string) => {
    return regex.test(string);
  });

  let left = leftDiagonal(matrix).filter((string) => {
    return regex.test(string);
  });

  return straight.concat(right).concat(left);
};

mutantCheck.isMutant = function (matrix) {
  let blocks = findMutant(matrix);
  return blocks.length > 1;
};

