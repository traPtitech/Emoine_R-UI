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
import { ServiceImpl } from '@bufbuild/connect'
import { Timestamp } from '@bufbuild/protobuf'

export const exampleEvent: Meeting = new Meeting({
  id: 'aaa',
  videoId: 'bbb',
  description: 'aaa',
  title: 'bbb',
  thumbnail: '',
  startedAt: new Timestamp({
    seconds: BigInt(0),
    nanos: 0
  }),
  endedAt: new Timestamp({
    seconds: BigInt(0),
    nanos: 0
  })
})
export const exampleToken: Token = new Token({
  id: '',
  raw: '',
  username: '',
  meetingId: '',
  creatorId: '',
  description: '',
  createdAt: new Timestamp({
    seconds: BigInt(0),
    nanos: 0
  }),
  expireAt: new Timestamp({
    seconds: BigInt(0),
    nanos: 0
  })
})
export const exampleComment: Comment = new Comment({
  id: '',
  meetingId: '',
  username: '',
  text: '',
  isAnonymous: false,
  color: '',
  createdAt: new Timestamp({
    seconds: BigInt(0),
    nanos: 0
  })
})
export const exampleReaction: Reaction = new Reaction({
  id: '',
  meetingId: '',
  username: '',
  stampId: '',
  createdAt: new Timestamp({
    seconds: BigInt(0),
    nanos: 0
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
