import { Category, JokeResponse } from "blagues-api/dist/types/types";
import Class from "..";

export default async function getJoke(client: Class, jokesType: Category): Promise<JokeResponse> {


    return new Promise(async(_resolve) => {
        const blague = await client.blagues.randomCategorized(
            jokesType
        );
        _resolve(blague)
    })
}