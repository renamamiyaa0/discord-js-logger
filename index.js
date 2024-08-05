const { Client, WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');
const client = new Client();
const messageDeleted = "https://discord.com/api/webhooks/1269911252029673492/bDfUU55gV41nCHgJol8VpEhgf6QB-BToMiMQ9tnqVxz3LQv_l3VCy2aSE1MShmws4VXb"
const messageEdited = "https://discord.com/api/webhooks/1269929369133121638/NmpNo_33CVecyXKzS73DP-ZF2aIx8ZbBbymHv1BOCCaxQwX-EM0g9Jlhf8px9Qeudo92"

const env = require("dotenv")
env.configDotenv()

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on("messageDelete", async (message) => {
  const category = [
    "1238600698850054167",
    "1245403487123275920",
    "1239789906629230642"
  ]
  const forum = [
    "1239793480205864970",
    "1245403945388609598",
    "1255193866064232639",
    "1238602001907191868",
    "1238601073338613760"
  ]

  if (category.includes(message.channel.parentId)) {
    // You can add your logging logic here, e.g., send a message to a log channel
    if (message.content === null && message.attachments.size === 0) return;
    const webhookClient = new WebhookClient({
      url: messageDeleted,
    });

    // Create an embed for the deleted message
    const embed = new MessageEmbed()
     .setTitle('Message Deleted')
     .setDescription(`A message was deleted in <#${message.channel.id}>`)
     .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
     .addField('Message Content', message.content || "No content")
     .addField('Message Author', `<@${message.author.id}> / ${message.author.id}` || 'Unknown')
     .setTimestamp()
     .setColor('RED');

    // Check if there are any attachments (e.g. images)
    if (message.attachments.size > 0) {
      let attachmentStrings = message.attachments.map(attachment => attachment.url);
      for (let i = 0; i < attachmentStrings.length; i += 3) {
        const attachmentChunk = attachmentStrings.slice(i, i + 3).join(', ');
        embed.addField('Attachments', attachmentChunk);
        if (embed.length >= 6000) {
          webhookClient.send({ embeds: [embed] });
          embed.fields = []; // Clear fields for the next batch
        }
      }
    }

    // Send the embed to the webhook
    webhookClient.send({
      embeds: [embed],
    });
  }

  if (message.channel.type === "GUILD_PUBLIC_THREAD" && forum.includes(message.channel.parentId)) {
    if (message.content === null && message.attachments.size === 0) return;
    const webhookClient = new WebhookClient({
      url: messageDeleted,
    });

    // Create an embed for the deleted message
    const embed = new MessageEmbed()
     .setTitle('Message Deleted')
     .setDescription(`A message was deleted in <#${message.channel.id}>`)
     .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
     .addField('Message Content', message.content || "No content")
     .addField('Message Author', `<@${message.author.id}> / ${message.author.id}` || 'Unknown')
     .setTimestamp()
     .setColor('RED');

    // Check if there are any attachments (e.g. images)
    if (message.attachments.size > 0) {
      let attachmentStrings = message.attachments.map(attachment => attachment.url);
      for (let i = 0; i < attachmentStrings.length; i += 3) {
        const attachmentChunk = attachmentStrings.slice(i, i + 3).join(', ');
        embed.addField('Attachments', attachmentChunk);
        if (embed.length >= 6000) {
          webhookClient.send({ embeds: [embed] });
          embed.fields = []; // Clear fields for the next batch
        }
      }
    }

    // Send the embed to the webhook
    webhookClient.send({
      embeds: [embed],
    });
  }
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  const category = [
    "1238600698850054167",
    "1245403487123275920",
    "1239789906629230642"
  ];
  const forum = [
    "1239793480205864970",
    "1245403945388609598",
    "1255193866064232639",
    "1238602001907191868",
    "1238601073338613760"
  ]

  if (category.includes(oldMessage.channel.parentId)) {
    // Ignore if there are no changes in content or if it's just an attachment edit
    if (oldMessage.content === newMessage.content && oldMessage.attachments.size === newMessage.attachments.size) return;

    const webhookClient = new WebhookClient({
      url: messageEdited,
    });

    // Create an embed for the edited message
    const embed = new MessageEmbed()
      .setTitle('Message Edited')
      .setDescription(`A message was edited in <#${oldMessage.channel.id}>`)
      .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
      .addField('Original Content', oldMessage.content || "No content")
      .addField('New Content', newMessage.content || "No content")
      .addField('Message Author', `<@${oldMessage.author.id}> / ${oldMessage.author.id}` || 'Unknown')
      .setTimestamp()
      .setColor('ORANGE');

    // Check if there are any attachments in the old message
    if (oldMessage.attachments.size > 0) {
      let oldAttachmentStrings = oldMessage.attachments.map(attachment => attachment.url);
      for (let i = 0; i < oldAttachmentStrings.length; i += 3) {
        const attachmentChunk = oldAttachmentStrings.slice(i, i + 3).join(', ');
        embed.addField('Original Attachments', attachmentChunk);
      }
    }

    // Check if there are any new attachments in the edited message
    if (newMessage.attachments.size > 0) {
      let newAttachmentStrings = newMessage.attachments.map(attachment => attachment.url);
      for (let i = 0; i < newAttachmentStrings.length; i += 3) {
        const attachmentChunk = newAttachmentStrings.slice(i, i + 3).join(', ');
        embed.addField('New Attachments', attachmentChunk);
      }
    }

    // Send the embed to the webhook
    webhookClient.send({
      embeds: [embed],
    });
  }

  if (oldMessage.channel.type === "GUILD_PUBLIC_THREAD" && forum.includes(oldMessage.channel.parentId)) {
    if (oldMessage.content === newMessage.content && oldMessage.attachments.size === newMessage.attachments.size) return;

    const webhookClient = new WebhookClient({
      url: messageEdited,
    });

    // Create an embed for the edited message
    const embed = new MessageEmbed()
      .setTitle('Message Edited')
      .setDescription(`A message was edited in <#${oldMessage.channel.id}>`)
      .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
      .addField('Original Content', oldMessage.content || "No content")
      .addField('New Content', newMessage.content || "No content")
      .addField('Message Author', `<@${oldMessage.author.id}> / ${oldMessage.author.id}` || 'Unknown')
      .setTimestamp()
      .setColor('ORANGE');

    // Check if there are any attachments in the old message
    if (oldMessage.attachments.size > 0) {
      let oldAttachmentStrings = oldMessage.attachments.map(attachment => attachment.url);
      for (let i = 0; i < oldAttachmentStrings.length; i += 3) {
        const attachmentChunk = oldAttachmentStrings.slice(i, i + 3).join(', ');
        embed.addField('Original Attachments', attachmentChunk);
      }
    }

    // Check if there are any new attachments in the edited message
    if (newMessage.attachments.size > 0) {
      let newAttachmentStrings = newMessage.attachments.map(attachment => attachment.url);
      for (let i = 0; i < newAttachmentStrings.length; i += 3) {
        const attachmentChunk = newAttachmentStrings.slice(i, i + 3).join(', ');
        embed.addField('New Attachments', attachmentChunk);
      }
    }

    // Send the embed to the webhook
    webhookClient.send({
      embeds: [embed],
    });
  }
});



client.login(process.env.TOKEN);