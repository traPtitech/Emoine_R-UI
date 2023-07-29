import {
  Token as TokenType,
  Meeting as MeetingType,
  Comment as CommentType,
  Reaction as ReactionType
} from './apis/generated/proto/emoine_r/v1/schema_pb'
import dayjs, { Dayjs } from 'dayjs'

// 生成したclassからメソッドを削除したもの
type PropertiesOnly<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K
  }[keyof T]
>

export interface Event
  extends Omit<PropertiesOnly<MeetingType>, 'startedAt' | 'endedAt'> {
  startedAt: Dayjs
  endedAt: Dayjs
}
export interface Token
  extends Omit<PropertiesOnly<TokenType>, 'createdAt' | 'expireAt'> {
  createdAt: Dayjs
  expireAt: Dayjs
}
export interface Comment
  extends Omit<PropertiesOnly<CommentType>, 'createdAt'> {
  createdAt: Dayjs
}
export interface Reaction
  extends Omit<PropertiesOnly<ReactionType>, 'createdAt'> {
  createdAt: Dayjs
}

export const convertEvent = (event: MeetingType): Event => ({
  ...event,
  startedAt: dayjs(event.startedAt?.toDate()),
  endedAt: dayjs(event.endedAt?.toDate())
})
export const convertEvents = (events: MeetingType[]): Event[] =>
  events.map(convertEvent)

export const convertToken = (token: TokenType): Token => ({
  ...token,
  createdAt: dayjs(token.createdAt?.toDate()),
  expireAt: dayjs(token.expireAt?.toDate())
})
export const convertTokens = (tokens: TokenType[]): Token[] =>
  tokens.map(convertToken)
export const convertComment = (comment: CommentType): Comment => ({
  ...comment,
  createdAt: dayjs(comment.createdAt?.toDate())
})
export const convertReaction = (reaction: ReactionType): Reaction => ({
  ...reaction,
  createdAt: dayjs(reaction.createdAt?.toDate())
})
