import express from 'express'
import fs from 'fs'
import https from 'https'
import { MessageEmbed } from 'discord.js'
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

    app.get('/', async (_, res) => {
        res.sendStatus(403)
    })

    app.post('/', async (req, res) => {
        const data = req.body
        // console.log(data)
        const auth = data.auth

        if (process.env.AUTHORIZATION === auth) {
            const user = data.userid
            const title = data.title
            const message = data.message
            const color = data.color
            const fieldTitles = data.fieldTitles
            const fieldValues = data.fieldValues
            const member = await client.users.fetch(user)

            const response = await generateEmbed(title, message, color, fieldTitles, fieldValues)
            member
                .createDM()
                .then((DMChannel) => {
                    DMChannel
                        .send({ embeds: [response] })
                        .catch(err => console.log(err, `Error with ${member}, Could not send DM, member has messages from server members disabled`))
                })

            res.sendStatus(200)
        } else {
            res.sendStatus(403)
        }

    })

    app.use("/", router)

    if (process.env.PRIVKEY && process.env.CERT) {
        return https
    } else {
        return app
    }

}