import { rest } from 'msw'

export const tests = [
  rest.get('/api/meeting', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        total_meetings: 0,
        meetings: [
          {
            id: 'ididididid',
            video_id: 'ididididid',
            title: 'titletitletitletitle',
            thumbnail:
              'https://connpass-tokyo.s3.amazonaws.com/thumbs/b0/fc/b0fcaa37725965741cada4eaf9b730af.png',
            started_at: '2023-02-16',
            ended_at: '2023-02-16',
            description: 'descriptiondescriptiondescriptiondescription'
          }
        ]
      })
    )
  })
]
