import { Client } from "discord.js";

export default async function getJoke(client: Client, jokesType: string) {


    return new Promise(async(_resolve) => {
        const blague = await client.blagues.randomCategorized(
            jokesType
        );
        _resolve(blague)
    })
}