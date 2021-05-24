const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { StatusCodes } = require('http-status-codes')
const cors = require('cors')

const { isMutant } = require('./utils/mutantCheck')
const { validate } = require('./utils/matrixValidator')
const dbQueries = require('./utils/dbQueries')

const app = express()
const table = 'xmen'

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())
app.get('/health', async function (req, res) {
    res.status(StatusCodes.OK).json({status: "Ok"})
})
app.get('/stats', async function (req, res) {
    const isMutant = await dbQueries.count(table, { is_mutant: true })
    const isNoMutant = await dbQueries.count(table, { is_mutant: false, error: false })
    let ratio = 0
    if(parseInt(isMutant.count, 10) != 0 && parseInt(isNoMutant.count, 10) != 0){
      ratio = parseInt(isMutant.count, 10) / parseInt(isNoMutant.count, 10)
    }
    
    res.status(StatusCodes.OK).json({
        count_mutant_dna: parseInt(isMutant.count, 10),
        count_human_dna: parseInt(isNoMutant.count, 10),
        ratio: ratio
    })
})

app.post('/mutant', async function (req, res) {
    const { body: { dna } } = req

    const isvalidMatrix = validate(dna)
    if (isvalidMatrix.error) {
        return res.status(StatusCodes.FORBIDDEN).json({ is_mutant: false, ...isvalidMatrix })
    }
    const oldDna = await dbQueries.select(table, { request: dna })
    const response = isMutant(dna)
    if (response) {
        if(!oldDna){ saveResult(dna, { is_mutant: true }, false, true)}
        return res.status(StatusCodes.OK).json({ is_mutant: true })
    }

    if(!oldDna) {saveResult(dna, { is_mutant: false }, false, false)}

    return res.status(StatusCodes.FORBIDDEN).json({ is_mutant: false })
})

const saveResult = async (request, response, error, is_mutant) => {
    dbQueries.insert(
        table,
        {
            request,
            response,
            error,
            is_mutant
        }
    )
}

module.exports = app