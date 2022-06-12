import { blue, green } from 'colors';
import Class from '..';
import moment from "moment";
import getJoke from "../functions/getJoke"

export = async (client: Class) => {
  //client.postSlashs(client.slashs);

  const activities = [`${client.config.prefix}help`, `Version ${client.version}`,'By Nolhan#2508'];
  await client.user.setActivity("Démarrage en cours...", { type: "STREAMING", url: "https://twitch.tv/discord" });
  console.log(green("[BOT]") + ` Connecté en tant que ${blue(`${client?.user.tag}`)}`);
  setInterval(async () => {
    await client?.user.setActivity(activities[Math.floor(Math.random() * activities.length)], { type: "Streaming", url: "https://twitch.tv/discord" });
  }, 120000);

  setInterval(async () => {
      if (moment(Date.now()).format("hh:mm") !== "14:55") return;
      console.log(1)
      if (client.jokeChannels.array().length === 0) return;

      const blague = await getJoke(client, "global");

        client.jokeChannels.forEach(async (data) => {
          const channel = client.channels.cache.get(data.channel);
          if (!channel || channel.type !== "GUILD_TEXT" && channel.type !== "GUILD_NEWS") return client.jokeChannels.delete(data.id);

          channel.send({
              content: null,
              embeds: [
                  {
                      title: `[${blague.id} ➜ ${blague.type.toUpperCase()}] ➜ ${interaction.values[0] === "global" ? "Blague générale" : interaction.values[0] === "dev" ? "Blague de développeur" : interaction.values[0] === "dark" ? "Humour noir" : interaction.values[0] === "blondes" ? "Blague de blonde" : interaction.values[0] === "limit" ? "Blague 18+" : interaction.values[0] === "beauf" ? "Blague de beauf" : "Blague de type incconu"}`,
                      description: `${blague.joke}\n\n> ||${blague.answer}||`,
                      color: client.config.color.integer,
                      footer: {
                          text: `JokeMan V${client.version} • By: Nolhan#2508`
                      }
                  }
              ]
          })
        })
  }, 60000)
}