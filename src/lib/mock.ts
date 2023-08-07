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

export const exampleEvents = (n: number): Meeting[] =>
  Array(n)
    .fill(null)
    .map(
      () =>
        new Meeting({
          id: randomString(5, 32),
          videoId: randomString(5, 11),
          description: randomString(5, 100),
          title: randomString(5, 20),
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
    )
export const exampleEvent = exampleEvents(1)[0]

export const exampleTokens = (n: number): Token[] =>
  Array(n)
    .fill(null)
    .map(
      () =>
        new Token({
          id: randomString(5, 32),
          raw: randomString(5, 30),
          username: randomString(5, 20),
          meetingId: randomString(5, 32),
          creatorId: randomString(5, 32),
          description: randomString(5, 100),
          createdAt: new Timestamp({
            seconds: BigInt(randomNum(0, 1000000000)),
            nanos: randomNum(0, 1000000)
          }),
          expireAt: new Timestamp({
            seconds: BigInt(randomNum(0, 1000000000)),
            nanos: randomNum(0, 1000000)
          })
        })
    )
export const exampleToken = exampleTokens(1)[0]
export const exampleComments = (n: number): Comment[] =>
  Array(n)
    .fill(null)
    .map(
      () =>
        new Comment({
          id: randomString(5, 32),
          meetingId: randomString(5, 32),
          username: randomString(5, 20),
          text: randomString(5, 100),
          isAnonymous: false,
          color: '#000000',
          createdAt: new Timestamp({
            seconds: BigInt(randomNum(0, 1000000000)),
            nanos: randomNum(0, 1000000)
          })
        })
    )
const exampleComment = exampleComments(1)[0]
export const exampleReactions = (n: number): Reaction[] =>
  Array(n)
    .fill(null)
    .map(
      () =>
        new Reaction({
          id: randomString(5, 32),
          meetingId: randomString(5, 32),
          username: randomString(5, 20),
          stampId: randomString(5, 32),
          createdAt: new Timestamp({
            seconds: BigInt(randomNum(0, 1000000000)),
            nanos: randomNum(0, 1000000)
          })
        })
    )
const exampleReaction = exampleReactions(1)[0]

export const generalApiMock: Partial<ServiceImpl<typeof GeneralAPIService>> = {
  getMeetings: () =>
    new GetMeetingsResponse({
      total: 100,
      meetings: exampleEvents(12)
    }),
  getMeeting: () => new GetMeetingResponse({ meeting: exampleEvent }),
  getMeetingComments: () =>
    new GetMeetingCommentsResponse({
      comments: exampleComments(20)
    }),
  getMeetingReactions: () =>
    new GetMeetingReactionsResponse({
      reactions: exampleReactions(10)
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
      tokens: exampleTokens(12)
    }),
  generateToken: () => new GenerateTokenResponse({ token: exampleToken }),
  revokeToken: () => ({})
}
