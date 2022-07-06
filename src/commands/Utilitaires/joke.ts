import {
    Message,
    MessageActionRow,
    MessageSelectMenu,
    MessageComponentInteraction,
    SelectMenuInteraction,
    MessageButton,
    ButtonInteraction
} from "discord.js";
import Class from "../..";
import Command from "../../utils/Command";
import getJoke from "../../functions/getJoke";
import { CategoriesRefsFull, JokeEmojis } from "../../types/Category";
import { Category, JokeResponse } from "blagues-api/dist/types/types";

class Joke extends Command {
    constructor() {
        super({
            name: 'joke',
            aliases: ['blague'],
            category: 'Utilitaire',
            description: 'Vous raconte une blague',
            usage: 'joke',
            cooldown: 10
        });
    }

    catergories = Object.entries(CategoriesRefsFull).map(([key, name]) => ({
        label: name,
        value: key,
        emoji: JokeEmojis[key as Category]
    }))
    // @ts-ignore
    async run(client: Class, message: Message, args: string[]): Promise<Message<boolean>> {
        const menu = new MessageSelectMenu()
            .setPlaceholder("Sélectionnez le type de blagues que vous souhaitez")
            .setCustomId("joke")
            .setOptions(this.catergories)

        const btn = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId("jokeBTN")
            .setLabel("Encore !")
            .setEmoji("🔁")

        const row = new MessageActionRow()
            .setComponents(menu)

        const row2 = new MessageActionRow()
            .setComponents(btn)

        const msg = await message.reply({
            content: null,
            embeds: [
                {
                    title: "Sélectionnez avec le menu ci-dessous le type de blagues que vous souhaitez.",
                    footer: {
                        text: `JokeMan V${client.version} • By: Nolhan#2508`
                    },
                    color: client.config.color.integer
                }
            ],
            components: [row]
        })

        const filter = (x: MessageComponentInteraction) => x?.user.id === message.author.id && x?.customId === "joke";
        const collector = await msg.createMessageComponentCollector({ filter, max: 1, time: 30000 })

        collector.on("collect", async (interaction: SelectMenuInteraction) => {
            await interaction.deferUpdate()
            await getJoke(client, interaction.values[0] as Category)
                // @ts-ignore
                .then(async (blague: JokeResponse) => {
                    msg.edit({
                        content: null,
                        embeds: [
                            {
                                title: `[${blague.id} ➜ ${blague.type.toUpperCase()}] ➜ ${CategoriesRefsFull[blague.type as Category]}`,
                                description: `${blague.joke}\n\n> ||${blague.answer}||`,
                                color: client.config.color.integer,
                                footer: {
                                    text: `JokeMan V${client.version} • By: Nolhan#2508`
                                }
                            }
                        ],
                        components: [row2]
                    })
                        .then(async (m: Message) => {
                            const filter2 = (x: MessageComponentInteraction) => x?.user.id === message.author.id && x?.customId === "jokeBTN";
                            const collector2 = m.createMessageComponentCollector({ filter: filter2, time: 10 * 60000 })

                            collector2.on("collect", async (inter: ButtonInteraction) => {
                                await inter.deferUpdate()
                                await getJoke(client, interaction.values[0] as Category)
                                    // @ts-ignore
                                    .then(async (blague: JokeResponse) => {
                                        msg.edit({
                                            content: null,
                                            embeds: [
                                                {
                                                    title: `[${blague.id} ➜ ${blague.type.toUpperCase()}] ➜ ${CategoriesRefsFull[blague.type as Category]}`,
                                                    description: `${blague.joke}\n\n> ||${blague.answer}||`,
                                                    color: client.config.color.integer,
                                                    footer: {
                                                        text: `JokeMan V${client.version} • By: Nolhan#2508`
                                                    }
                                                }
                                            ],
                                            components: [row2]
                                        })
                                    })
                                    .catch(async (err: Error) => {
                                        msg.edit({
                                            content: null,
                                            embeds: [
                                                {
                                                    title: `ERREUR !`,
                                                    description: `L'API de blagues-api n'a pas répondu à votre requête. Veuillez réessayer ultérieurement.\n\n> ${err.message}`,
                                                    color: client.config.color.integer,
                                                    footer: {
                                                        text: `JokeMan V${client.version} • By: Nolhan#2508`
                                                    }
                                                }
                                            ],
                                            components: []
                                        })
                                    })
                            })

                            collector2.on("end", async () => {
                                btn.setDisabled(true)
                                row2.setComponents(btn)
                                msg.edit({
                                    content: null,
                                    embeds: msg.embeds,
                                    components: [row2]
                                })
                            })
                        })
                })
                .catch(async (err: Error) => {
                    msg.edit({
                        content: null,
                        embeds: [
                            {
                                title: `ERREUR !`,
                                description: `L'API de blagues-api n'a pas répondu à votre requête. Veuillez réessayer ultérieurement.\n\n> ${err.message}`,
                                color: client.config.color.integer,
                                footer: {
                                    text: `JokeMan V${client.version} • By: Nolhan#2508`
                                }
                            }
                        ],
                        components: []
                    })
                })
        })
    }
}

export = new Joke;
