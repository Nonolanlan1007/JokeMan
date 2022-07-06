import { Category } from "blagues-api/dist/types/types";
import Class from "..";

export default async function getJoke(client: Class, jokesType: Category) {


    return new Promise(async(_resolve) => {
        const blague = await client.blagues.randomCategorized(
            jokesType
        );
        _resolve(blague)
    })
}