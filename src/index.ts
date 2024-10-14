import { Context, Schema, h } from 'koishi'
export const name = 'smmcat-balogo'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  const baLogoTool = {
    async setImg(top: string, bottom: string) {
      if (!bottom) {
        bottom = top.slice(Math.floor(top.length / 2))
        top = top.slice(0, Math.floor(top.length / 2))
      }
      return h.image(`https://oiapi.net/API/BlueArchive?startText=${encodeURIComponent(top)}&endText=${encodeURIComponent(bottom)}`)
    }
  }
  ctx
    .command('ba生图 <text:text>')
    .action(async ({ session }, text) => {
      if (!text) {
        await session.send("请输入你想生成的字符。符号左右文字用空格隔开 (10秒内输入)")
        text = await session.prompt(10000)
        if (!text) {
          return
        }
      }
      const res = h.select(text, 'text').map(item => item.attrs.content).join('').split(/\s+/).filter(str => str !== "").slice(0, 2);
      return baLogoTool.setImg(res[0], res[1])
    })
}
