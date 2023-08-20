import { AdminAPIService } from '@/lib/apis/generated/proto/emoine_r/v1/admin_api_connect'
import {
  CreateEventResponse,
  GenerateTokenResponse,
  GetTokensResponse
} from '@/lib/apis/generated/proto/emoine_r/v1/admin_api_pb'
import { GeneralAPIService } from '@/lib/apis/generated/proto/emoine_r/v1/general_api_connect'
import {
  ConnectToEventStreamResponse,
  GetEventCommentsResponse,
  GetEventReactionsResponse,
  GetEventResponse,
  GetEventsResponse,
  SendCommentResponse,
  SendReactionResponse
} from '@/lib/apis/generated/proto/emoine_r/v1/general_api_pb'
import { Event, Token, Comment, Reaction } from '@/lib/apis'
import { randomDate, randomSleep, randomString } from '@/lib/random'
import { ServiceImpl } from '@bufbuild/connect'
import { Timestamp } from '@bufbuild/protobuf'

export const exampleEvents = (n: number): Event[] =>
  Array(n)
    .fill(null)
    .map(
      () =>
        new Event({
          id: randomString(5, 32),
          videoId: randomString(5, 11),
          description: randomString(5, 100),
          title: randomString(5, 20),
          thumbnail:
            'https://media.connpass.com/thumbs/b0/fc/b0fcaa37725965741cada4eaf9b730af.png',
          startedAt: Timestamp.fromDate(randomDate()),
          endedAt: Timestamp.fromDate(randomDate())
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
          eventId: randomString(5, 32),
          creatorId: randomString(5, 32),
          description: randomString(5, 100),
          createdAt: Timestamp.fromDate(randomDate()),
          expireAt: Timestamp.fromDate(randomDate())
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
          eventId: randomString(5, 32),
          username: randomString(5, 20),
          text: randomString(5, 100),
          isAnonymous: false,
          color: '#000000',
          createdAt: Timestamp.fromDate(randomDate())
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
          eventId: randomString(5, 32),
          username: randomString(5, 20),
          stampId: randomString(5, 32),
          createdAt: Timestamp.fromDate(randomDate())
        })
    )
const exampleReaction = exampleReactions(1)[0]

export const generalApiMock: Partial<ServiceImpl<typeof GeneralAPIService>> = {
  getEvents: () =>
    new GetEventsResponse({
      total: 100,
      events: exampleEvents(12)
    }),
  getEvent: () => new GetEventResponse({ event: exampleEvent }),
  getEventComments: () =>
    new GetEventCommentsResponse({
      comments: exampleComments(20)
    }),
  getEventReactions: () =>
    new GetEventReactionsResponse({
      reactions: exampleReactions(10)
    }),
  connectToEventStream: async function* introduce() {
    await randomSleep()
    yield new ConnectToEventStreamResponse({
      streamEvent: {
        value: exampleComment,
        case: 'comment'
      }
    })
    await randomSleep()
    yield new ConnectToEventStreamResponse({
      streamEvent: {
        value: exampleReaction,
        case: 'reaction'
      }
    })
    await randomSleep()
    yield new ConnectToEventStreamResponse({
      streamEvent: {
        value: exampleComment,
        case: 'comment'
      }
    })
  },
  sendComment: () => new SendCommentResponse({ comment: exampleComment }),
  sendReaction: () => new SendReactionResponse({ reaction: exampleReaction })
}

export const adminApiMock: ServiceImpl<typeof AdminAPIService> = {
  createEvent: () =>
    new CreateEventResponse({
      event: exampleEvent
    }),
  updateEvent: () => ({}),
  deleteEvent: () => ({}),
  getTokens: () =>
    new GetTokensResponse({
      tokens: exampleTokens(12)
    }),
  generateToken: () => new GenerateTokenResponse({ token: exampleToken }),
  revokeToken: () => ({})
}
