const db = require('./db')


const dbQueries = module.exports

dbQueries.insert = async (table, data) => {
    const query = await db(table).insert(data)
    return query
}

dbQueries.select = async (table, where) => {
    const data = await db(table).select('*').where(where).first()
    return data
}

dbQueries.count = async (table, where) => {
    const data = await db(table).count('*').where(where).first()
    return data
}
