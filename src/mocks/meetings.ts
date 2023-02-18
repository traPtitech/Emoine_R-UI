import { rest } from 'msw'

export const meetings = [
  rest.get('/api/meetings', (req, res, ctx) => {
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
  }),
  rest.get('/api/meetings/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          meeting: {
            id: 'ididididid',
            video_id: 'ididididid',
            title: 'titletitletitletitle',
            thumbnail:
              'https://connpass-tokyo.s3.amazonaws.com/thumbs/b0/fc/b0fcaa37725965741cada4eaf9b730af.png',
            started_at: '2023-02-16',
            ended_at: '2023-02-16',
            description: 'descriptiondescriptiondescriptiondescription'
          },
          tokens: [
            {
              token: 'tokentokentoken',
              created_by: 'adminadminadmin',
              user_id: 'idididididididid',
              created_at: '2023-02-16',
              expire_at: '2023-03-16',
              meeting_id: 'ididididid',
              description: 'descriptiondescriptiondescriptiondescription'
            }
          ]
        }
      ])
    )
  })
]
