import { JokeResponse } from "blagues-api/dist/types/types";

import Class from "..";
import { Category } from "../types/Category";

export default async function getJoke(client: Class, jokesType: Category): Promise<JokeResponse> {


    return new Promise(async(_resolve) => {
        if (jokesType == "random") {
            const blague = await client.blagues.random();
            _resolve(blague)
        } else {
            const blague = await client.blagues.randomCategorized(
                jokesType
            );
            _resolve(blague)
        }
    })
}