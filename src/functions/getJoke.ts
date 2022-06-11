import { Client } from "discord.js";

export default async function getJoke(client: Client, jokesType: string) {
    /*
    let typesArray = []
    if (jokesType.global === false) typesArray.push(client.blagues.categories.GLOBAL)
    if (jokesType.dev === false) typesArray.push(client.blagues.categories.DEV)
    if (jokesType.p18 === false) typesArray.push(client.blagues.categories.LIMIT)
    if (jokesType.dark === false) typesArray.push(client.blagues.categories.DARK)
    if (jokesType.beaufs === false) typesArray.push(client.blagues.categories.BEAUF)
    if (jokesType.blondes === false) typesArray.push(client.blagues.categories.BLONDES)
    */

    return new Promise(async(_resolve) => {
        const blague = await client.blagues.randomCategorized(
            jokesType
        );
        _resolve(blague)
    })
}