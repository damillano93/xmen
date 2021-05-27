const supertest = require('supertest')
const app = require('./index')
const { x4,x5,x6,x7,x8 } = require('./test_cases/isMutantOk')
const isMutantFalse = require('./test_cases/isMutantFalse')
const isMutantError = require('./test_cases/isMutantError')
const request = supertest(app)


it('test isMutant FALSE x4', async done => {
    const response = await request
        .post('/mutant')
        .send(x4)

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    done()
})

it('test isMutant OK x5', async done => {
    const response = await request
        .post('/mutant')
        .send(x5)

    expect(response.status).toBe(200)
    expect(response.body.is_mutant).toBe(true)
    done()
})

it('test isMutant OK x6', async done => {
    const response = await request
        .post('/mutant')
        .send(x6)

    expect(response.status).toBe(200)
    expect(response.body.is_mutant).toBe(true)
    done()
})

it('test isMutant OK x7', async done => {
    const response = await request
        .post('/mutant')
        .send(x7)

    expect(response.status).toBe(200)
    expect(response.body.is_mutant).toBe(true)
    done()
})

it('test isMutant OK x8', async done => {
    const response = await request
        .post('/mutant')
        .send(x8)

    expect(response.status).toBe(200)
    expect(response.body.is_mutant).toBe(true)
    done()
})

it('test isMutant FALSE', async done => {
    const response = await request
        .post('/mutant')
        .send(isMutantFalse.x4)

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    done()
})

it('test isMutant FALSE x5', async done => {
    const response = await request
        .post('/mutant')
        .send(isMutantFalse.x5)

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    done()
})

it('test isMutant FALSE x6', async done => {
    const response = await request
        .post('/mutant')
        .send(isMutantFalse.x6)

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    done()
})

it('test isMutant FALSE x7', async done => {
    const response = await request
        .post('/mutant')
        .send(isMutantFalse.x7)

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    done()
})

it('test isMutant FALSE x8', async done => {
    const response = await request
        .post('/mutant')
        .send(isMutantFalse.x8)

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    done()
})

it('test isMutant ERROR invalid body', async done => {
    const response = await request
        .post('/mutant')
        .send({dna:""})

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    expect(response.body.error).toBe(true)
    expect(response.body.description).toBe("dna is not matrix")
    done()
})

it('test isMutant ERROR Invalid matrix size', async done => {
    const response = await request
        .post('/mutant')
        .send({"dna": ["AATGCGCG" ]})

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    expect(response.body.error).toBe(true)
    expect(response.body.description).toBe("Invalid matrix size")
    done()
})

it('test isMutant ERROR invalid body', async done => {
    const response = await request
        .post('/mutant')
        .send({
            "dna": [
                "CTGCA",
                "CAFCA",
                "CCGTA",
                "CGGGA",
                "AAAAG"
            ]
         } )

    expect(response.status).toBe(403)
    expect(response.body.is_mutant).toBe(false)
    expect(response.body.error).toBe(true)
    expect(response.body.description).toBe("Invalid characters")
    done()
})

it('test stats', async done => {
    const response = await request
        .get('/stats')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('count_mutant_dna')
    expect(response.body).toHaveProperty('count_human_dna')
    expect(response.body).toHaveProperty('ratio')
    done()
})

it('test stats', async done => {
    const response = await request
        .get('/health')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('Ok')
    done()
})