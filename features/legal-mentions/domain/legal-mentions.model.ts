export interface LegalMentionsData {
  title: string
  content: any // lexical rich text
}

export interface LegalMentionsRepository {
  getLegalMentions(): Promise<LegalMentionsData>
}
