import express from 'express'
import { DMChannel, MessageEmbed } from 'discord.js'
const router = express.Router()
function generateEmbed(title, description, color, arrFieldNames, arrFieldValues) {
    return new Promise((resolve) => {
        if (typeof (arrFieldNames) != 'undefined') {
            if (arrFieldNames.length == arrFieldValues.length) {
                const response = new MessageEmbed()
                    .setColor(color)
                    .setTitle(title)
                    .setDescription(description);
                for (var i = 0; i < arrFieldNames.length; i++) {
                    response.addField(arrFieldNames[i], arrFieldValues[i]);
                }
                resolve(response);
            }
        } else {
            const response = new MessageEmbed()
                .setTitle(title)
                .setDescription(description);
            resolve(response);
        }
    });
};


export const startServer = client => {


    const app = express()
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    app.post('/', async (req, res) => {
        const data = req.body
        const auth = data.auth
        const title = data.title
        const message = data.message
        const color = data.color
        const fieldTitles = data.fieldTitles
        const fieldValues = data.fieldValues
        const user = data.userid
        const member = await client.users.fetch(user)

        const response = await generateEmbed(title, message, color, fieldTitles, fieldValues)

        member
            .createDM()
            .then((DMChannel) => {
                DMChannel
                    .send({ embeds: [response] })
                    .catch(err => console.log(err, `Error with ${member}, Could not send DM, member has messages from server member's disabled`))
            })

        res.sendStatus(200)
    })

    app.use("/", router)
    return app
}