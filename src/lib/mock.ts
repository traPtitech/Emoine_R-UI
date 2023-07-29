import { AdminAPIService } from '@/lib/apis/generated/proto/emoine_r/v1/admin_api_connect'
import {
  CreateMeetingResponse,
  GenerateTokenResponse,
  GetTokensResponse
} from '@/lib/apis/generated/proto/emoine_r/v1/admin_api_pb'
import { GeneralAPIService } from '@/lib/apis/generated/proto/emoine_r/v1/general_api_connect'
import {
  GetMeetingCommentsResponse,
  GetMeetingReactionsResponse,
  GetMeetingResponse,
  GetMeetingsResponse,
  SendCommentResponse,
  SendReactionResponse
} from '@/lib/apis/generated/proto/emoine_r/v1/general_api_pb'
import {
  Meeting,
  Token,
  Comment,
  Reaction
} from '@/lib/apis/generated/proto/emoine_r/v1/schema_pb'
import { randomNum, randomString } from '@/lib/random'
import { ServiceImpl } from '@bufbuild/connect'
import { Timestamp } from '@bufbuild/protobuf'

export const exampleEvent: Meeting = new Meeting({
  id: randomString(32),
  videoId: randomString(11),
  description: randomString(100),
  title: randomString(20),
  thumbnail:
    'https://media.connpass.com/thumbs/b0/fc/b0fcaa37725965741cada4eaf9b730af.png',
  startedAt: new Timestamp({
    seconds: BigInt(randomNum(0, 1000000000)),
    nanos: randomNum(0, 1000000)
  }),
  endedAt: new Timestamp({
    seconds: BigInt(randomNum(0, 1000000000)),
    nanos: randomNum(0, 1000000)
  })
})
export const exampleToken: Token = new Token({
  id: randomString(32),
  raw: randomString(30),
  username: randomString(20),
  meetingId: randomString(32),
  creatorId: randomString(32),
  description: randomString(100),
  createdAt: new Timestamp({
    seconds: BigInt(randomNum(0, 1000000000)),
    nanos: randomNum(0, 1000000)
  }),
  expireAt: new Timestamp({
    seconds: BigInt(randomNum(0, 1000000000)),
    nanos: randomNum(0, 1000000)
  })
})
export const exampleComment: Comment = new Comment({
  id: randomString(32),
  meetingId: randomString(32),
  username: randomString(20),
  text: randomString(100),
  isAnonymous: false,
  color: '#000000',
  createdAt: new Timestamp({
    seconds: BigInt(randomNum(0, 1000000000)),
    nanos: randomNum(0, 1000000)
  })
})
export const exampleReaction: Reaction = new Reaction({
  id: randomString(32),
  meetingId: randomString(32),
  username: randomString(20),
  stampId: randomString(32),
  createdAt: new Timestamp({
    seconds: BigInt(randomNum(0, 1000000000)),
    nanos: randomNum(0, 1000000)
  })
})

export const generalApiMock: Partial<ServiceImpl<typeof GeneralAPIService>> = {
  getMeetings: () =>
    new GetMeetingsResponse({
      total: 100,
      meetings: Array(12).fill(exampleEvent)
    }),
  getMeeting: () => new GetMeetingResponse({ meeting: exampleEvent }),
  getMeetingComments: () =>
    new GetMeetingCommentsResponse({
      comments: Array(20).fill(exampleComment)
    }),
  getMeetingReactions: () =>
    new GetMeetingReactionsResponse({
      reactions: Array(10).fill(exampleReaction)
    }),
  // connectToMeetingStream: () => {}, todo: streamingのmockの書き方が分からなかった
  sendComment: () => new SendCommentResponse({ comment: exampleComment }),
  sendReaction: () => new SendReactionResponse({ reaction: exampleReaction })
}

export const adminApiMock: ServiceImpl<typeof AdminAPIService> = {
  createMeeting: () =>
    new CreateMeetingResponse({
      meeting: exampleEvent
    }),
  updateMeeting: () => ({}),
  deleteMeeting: () => ({}),
  getTokens: () =>
    new GetTokensResponse({
      tokens: Array(12).fill(exampleToken)
    }),
  generateToken: () => new GenerateTokenResponse({ token: exampleToken }),
  revokeToken: () => ({})
}
