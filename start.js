
const { PORT } = process.env

const app = require('./index.js')
app.listen(PORT, () => {
    console.log(`app listening at ${PORT}`)
})