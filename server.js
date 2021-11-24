import express, { json } from 'express'
const router = express.Router()

export const startServer = client => {
    const app = express()
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    app.get("/", async (req, res) => {
        const member = await client.users.fetch("96419794525360128")
        console.log(member)
        res.send(member.username)
    })

    app.post('/', async (req,res) =>{
        const data = req.body
        const auth = data.auth
        const message = data.message
        const user = data.userid
        const member = await client.users.fetch(user)
        member.send(message)

        res.status(200).send(member)
        // res.send(req).statusCode(200)
        // const memberID = await client.users.fetch(req.headers)
    })

    client.on('messageCreate', async(message) => {
        if (message.author.bot || message.channel.type === 'dm') return;
        // message.author.send("hello there")
        // message.reply('test')
        
      })


    app.use("/", router)
    return app
}