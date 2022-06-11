import { blue, green } from 'colors';
import Class from '..';

export = async (client: Class) => {
  //client.postSlashs(client.slashs);

  const activities = [`${client.config.prefix}help`, `Version ${client.version}`,'By Nolhan#2508'];
  await client.user.setActivity("Démarrage en cours...", { type: "STREAMING", url: "https://twitch.tv/discord" });
  console.log(green("[BOT]") + ` Connecté en tant que ${blue(`${client?.user.tag}`)}`);
  setInterval(async () => {
    await client?.user.setActivity(activities[Math.floor(Math.random() * activities.length)], { type: "Streaming", url: "https://twitch.tv/discord" });
  }, 120000);
}