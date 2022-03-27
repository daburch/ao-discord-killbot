const { createCanvas, loadImage, registerFont } = require("canvas");

const width = 651;
const height = 501;

registerFont('./fonts/Sarpanch-Regular.ttf', { family: 'Sarpanch', weight: 800 })

const draw = async (body) => {

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.font = '14px Sarpanch'


  if ((typeof(body) == 'undefined') || (body == null)) {
    return
  }

  const bg = await loadImage("./img/kill_base.png")
  ctx.drawImage(bg, 0, 0);

  // -- Killer --

  ctx.fillText(`${body.Killer.Name}`, 110, 140)
  ctx.fillText(`[ ${body.Killer.GuildName} ]`, 110, 160)
  ctx.fillText(`${body.Killer.AverageItemPower}`, 110, 180)

  await drawItem(ctx, body.Killer?.Equipment?.Bag?.Type, body?.Killer?.Equipment?.Bag?.Quality, 76, 189)
  await drawItem(ctx, body.Killer?.Equipment?.MainHand?.Type, body.Killer?.Equipment?.MainHand?.Quality, 76, 246)
  await drawItem(ctx, body.Killer?.Equipment?.Potion?.Type, body.Killer?.Equipment?.Potion?.Quality, 76, 302)
  
  await drawItem(ctx, body.Killer?.Equipment?.Head?.Type, body?.Killer?.Equipment?.Head?.Quality, 139, 183)
  await drawItem(ctx, body.Killer?.Equipment?.Armor?.Type, body?.Killer?.Equipment?.Armor?.Quality, 139, 240)
  await drawItem(ctx, body.Killer?.Equipment?.Shoes?.Type, body?.Killer?.Equipment?.Shoes?.Quality, 139, 296)
  await drawItem(ctx, body.Killer?.Equipment?.Mount?.Type, body?.Killer?.Equipment?.Mount?.Quality, 139, 353)

  await drawItem(ctx, body.Killer?.Equipment?.Cape?.Type, body?.Killer?.Equipment?.Cape?.Quality, 202, 189)
  await drawItem(ctx, body.Killer?.Equipment?.OffHand?.Type, body?.Killer?.Equipment?.OffHand?.Quality, 202, 246)
  await drawItem(ctx, body.Killer?.Equipment?.Food?.Type, body?.Killer?.Equipment?.Food?.Quality, 202, 302)

  // -- Victim --

  ctx.fillText(`${body.Victim.Name}`, 424, 140)
  ctx.fillText(`[ ${body.Victim.GuildName} ]`, 424, 160)
  ctx.fillText(`${body.Victim.AverageItemPower}`, 424, 180)

  await drawItem(ctx, body.Victim?.Equipment?.Bag?.Type, body?.Victim?.Equipment?.Bag?.Quality, 390, 189)
  await drawItem(ctx, body.Victim?.Equipment?.MainHand?.Type, body.Victim?.Equipment?.MainHand?.Quality, 390, 246)
  await drawItem(ctx, body.Victim?.Equipment?.Potion?.Type, body.Victim?.Equipment?.Potion?.Quality, 390, 302)
  
  await drawItem(ctx, body.Victim?.Equipment?.Head?.Type, body?.Victim?.Equipment?.Head?.Quality, 453, 183)
  await drawItem(ctx, body.Victim?.Equipment?.Armor?.Type, body?.Victim?.Equipment?.Armor?.Quality, 453, 240)
  await drawItem(ctx, body.Victim?.Equipment?.Shoes?.Type, body?.Victim?.Equipment?.Shoes?.Quality, 453, 296)
  await drawItem(ctx, body.Victim?.Equipment?.Mount?.Type, body?.Victim?.Equipment?.Mount?.Quality, 453, 353)

  await drawItem(ctx, body.Victim?.Equipment?.Cape?.Type, body?.Victim?.Equipment?.Cape?.Quality, 516, 189)
  await drawItem(ctx, body.Victim?.Equipment?.OffHand?.Type, body?.Victim?.Equipment?.OffHand?.Quality, 516, 246)
  await drawItem(ctx, body.Victim?.Equipment?.Food?.Type, body?.Victim?.Equipment?.Food?.Quality, 516, 302)

  // -- Time --
  var formattedDate = formatDate(body.TimeStamp)
  ctx.fillText(`${formattedDate}`, 50, 50)

  // -- Fame -- 
  ctx.fillText(`${body.KillFame}`, 300, 475)
  
  // write the image to file
  const buffer = canvas.toBuffer("image/png");
  // disc.invoke(buffer)
  return buffer
}

const drawItem = async(ctx, type, quality, x, y) => {

  if ((typeof(type) == 'undefined') || (type == null) ||
    (typeof(quality) == 'undefined') || (quality == null) ) {
    return
  }

  const im = await loadImage(`https://render.albiononline.com/v1/item/${type}.png?quality=${quality}&size=64`)
  ctx.drawImage(im, x, y);
}

const formatDate = (ts) => {

  if ((typeof(ts) == 'undefined') || (ts == null)) {
    return
  }

  var date = new Date(ts * 1000);
  const month = date.toLocaleString('default', { month: 'long' });
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();

  // Will display time in 10:30:23 format
  var formatted = month + " " + day + " " + hours + ':' + minutes.substring(minutes.length - 2, minutes.length);
  return formatted
}

module.exports.draw = draw;