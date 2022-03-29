import express, { json, urlencoded, Request, Response, NextFunction } from 'express'
import { sequelize, Todo } from './Todo'
import { TodoWithUser } from './TodoWithUser'
import cors from 'cors'

const app = express()
const port = 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/healthcheck', (req, res, next) => {
    res.status(200).json({
        status: 200,
        data: {
            message: 'OK'
        }
    })
})

app.use((req, res, next) => {
    console.log(
        Date(),
        req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        req.body,
        req.params,
        req.query,
        req.originalUrl,
        req.headers['user-agent'],
    )
    const token = req.headers['authorization']?.replace('Bearer ', '').split('.')[1]
    if (token) {
        res.locals.user = token
        next()
    }
    else res.status(403).end()
})

app.get('/', (req, res) => {
    res.header('Test-1', '1')
    res.header('Content-Type', 'image/jpeg')
    res.send('Hello World!')
})

app.get('/api/trap/:id', async (req, res, next) => {
    res.status(200).json({
        status: 200,
        data: {
            user: res.locals.user,
            message: 'OK'
        }
    })
})

app.get('/api/todo/list', async (req, res, next) => {
    try {
        const todos = await Todo.findAll()
        res.status(200).json({
            status: 200,
            data: todos
        })
    } catch (error) {
        next(error)
    }
})

app.post('/api/todo/create', async (req, res, next) => {
    try {
        const todos = await Todo.create(req.body)
        res.status(200).json({
            status: 200,
            data: todos
        })
    } catch (error) {
        next(error)
    }
})

app.get('/api/todowithuser/list', async (req, res, next) => {
    try {
        const todos = await TodoWithUser.findAll({
            where: {
                username: res.locals.user
            }
        })
        res.status(200).json({
            status: 200,
            data: todos
        })
    } catch (error) {
        next(error)
    }
})

app.post('/api/todowithuser/create', async (req, res, next) => {
    try {
        const todos = await TodoWithUser.create({ ...req.body, username: res.locals.user })
        res.status(200).json({
            status: 200,
            data: todos
        })
    } catch (error) {
        next(error)
    }
})

app.get('/api/todowithuser/get/:id', async (req, res, next) => {
    try {
        const todo = await TodoWithUser.findByPk(
            req.params.id,
            {}
        )
        if (todo?.username == res.locals.user) {
            res.status(200).json({
                status: 200,
                data: todo
            })
        }
        else res.status(200).json({
            status: 200,
            data: undefined,
        })
    } catch (error) {
        next(error)
    }
})

app.all('/*', async (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found',
    })
})

app.listen(port, async () => {
    await Todo.sync()
    await TodoWithUser.sync()
    await Todo.create({ note: 'Test 1' })
    console.log(`Example app listening on port ${port}`)
})