import { Message } from "discord.js";
import Class from "../..";
import Command from "../../utils/Command";

class Channel extends Command {
    constructor() {
        super({
            name: 'channel',
            aliases: ['ch'],
            category: 'Utilitaire',
            description: 'Définir le salon d\'envoi de la blague du jour.',
            usage: 'channel [salon]',
            cooldown: 0,
            perms: ["Administrator"]
        });
    }

    // @ts-ignore
    async run(client: Class, message: Message, args: string[]): Promise<Message<boolean>> {
        if (!args[0] || !message.mentions.channels.first() && !message?.guild?.channels.cache.get(args[0])) {
            // @ts-ignore
            if (!client.jokeChannels.has(message?.guild?.id) || !message?.guild?.channels.cache.get(client.jokeChannels.get(message?.guild?.id)?.channel)) return message.reply({ content: `**${client.emotes.no} ➜ Aucun salon défini.**` })
            if (message?.guild?.channels.cache.get(client.jokeChannels.get(message?.guild?.id)?.channel)) return message.reply({ content: `**${client.emotes.no} ➜ Les blagues du jour sont envoyées dans <#${client.jokeChannels.get(message?.guild?.id)?.channel}>.**` })
        }

        if (message.mentions.channels.first() || message?.guild?.channels.cache.get(args[0])) {
            // @ts-ignore
            client.jokeChannels.set(message?.guild?.id, {
                channel: message.mentions.channels.first()?.id || message?.guild?.channels.cache.get(args[0])?.id
            })

            message.reply({ content: `**${client.emotes.yes} ➜ Les blagues du jour seront maintenant envoyées dans <#${message.mentions.channels.first()?.id || message?.guild?.channels.cache.get(args[0])?.id}>.**` })
        }
    }
}

export = new Channel;