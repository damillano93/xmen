const matrixValidator = module.exports
pattern = /[^ATGC\-]/;

matrixValidator.validate = (matrix) => {
    if (matrix.length == 0) {
        return { error: true, description: 'dna is not matrix' }
    }
    for (const row of matrix) {
        if (pattern.test(row)) {
            return { error: true, description: 'Invalid characters' }
        }
        if (matrix.length != row.length) {
            return { error: true, description: 'Invalid matrix size' }
        }
    }
    return { error: false }
}