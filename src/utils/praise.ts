const GENERIC_PRAISES = [
  '在宅ワークの合間にちゃんと体を動かせたの、本当にすごいことだよ！',
  '肩甲骨がほぐれて、ドレス姿の華奢見せラインが確定したよ！',
  '10月末の結婚式で一番輝くの確定！本当にお疲れ様！',
  '今日も自分との約束を守れたね。それが一番かっこいい！',
  'コツコツ積み上げてるその姿勢、もう花嫁の風格が出てきてるよ！',
  '踊るたびにキラキラが増えていくのが見える気がする…！',
  'サボらず続けてるの、心から尊敬しちゃう！',
  '肩まわりが軽くなるたびに、笑顔も軽やかになってるはず！',
  '未来の花嫁、今日も絶好調だね！最高！',
  'その一歩が、当日の自信につながってるよ。積み重ね最強！',
]

const SONG_COUNT_PRAISES: Record<number, string[]> = {
  1: [
    '1曲でもやりきった自分を褒めてあげて！ゼロとイチの差は本当に大きいよ！',
    '忙しい合間に1曲踊れたの、それだけで花マル！',
  ],
  2: [
    '2曲も踊れたなんて、今日のあなたは絶好調だね！',
    '2曲分のリズム、ちゃんと体に効いてるはず。ナイスペース！',
  ],
  3: [
    '3曲踊りきるなんて、もはやアスリート！すごすぎる！',
    '在宅ワークの合間に3曲も踊ったの！？行動力がすごすぎる！',
  ],
}

export function getBigSongCountPraise(songs: number): string[] {
  if (songs >= 4) {
    return [
      `${songs}曲も踊りきるなんて、情熱がすごすぎる！体力も気力も花嫁レベル！`,
      `${songs}曲！？今日のあなたは無敵モードだね、本当にお疲れ様！`,
    ]
  }
  return SONG_COUNT_PRAISES[songs] ?? []
}

export function pickPraiseMessage(songs: number): string {
  const pool = [...GENERIC_PRAISES, ...getBigSongCountPraise(songs)]
  return pool[Math.floor(Math.random() * pool.length)]
}
