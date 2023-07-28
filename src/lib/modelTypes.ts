import {
  Token as TokenType,
  Meeting as MeetingType,
  Comment as CommentType,
  Reaction as ReactionType
} from './apis/generated/proto/emoine_r/v1/schema_pb'
import dayjs, { Dayjs } from 'dayjs'

export interface Event extends Omit<MeetingType, 'startedAt' | 'endedAt'> {
  startedAt: Dayjs
  endedAt: Dayjs
}
export interface Token extends Omit<TokenType, 'createdAt' | 'expireAt'> {
  createdAt: Dayjs
  expireAt: Dayjs
}
export interface Comment extends Omit<CommentType, 'createdAt'> {
  createdAt: Dayjs
}
export interface Reaction extends Omit<ReactionType, 'createdAt'> {
  createdAt: Dayjs
}

// fixme: undefinedだった場合の処理(そもそもundefinedにならないように生成したい)
export const convertEvent = (event: MeetingType): Event =>
  Object.assign(event, {
    startedAt: dayjs(event.startedAt?.toDate()),
    endedAt: dayjs(event.endedAt?.toDate())
  })
export const convertEvents = (events: MeetingType[]): Event[] =>
  events.map(convertEvent)

export const convertToken = (token: TokenType): Token =>
  Object.assign(token, {
    createdAt: dayjs(token.createdAt?.toDate()),
    expireAt: dayjs(token.expireAt?.toDate())
  })
export const convertTokens = (tokens: TokenType[]): Token[] =>
  tokens.map(convertToken)
export const convertComment = (comment: CommentType): Comment =>
  Object.assign(comment, {
    createdAt: dayjs(comment.createdAt?.toDate())
  })
export const convertReaction = (reaction: ReactionType): Reaction =>
  Object.assign(reaction, {
    createdAt: dayjs(reaction.createdAt?.toDate())
  })
