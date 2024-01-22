export interface IFormErrorIssues {
  code: string
  message: string
  path: string[]
}
export interface IFormError extends Error {
  readonly issues: IFormErrorIssues[]
}
export class FormError extends Error implements IFormError {
  public readonly issues: IFormErrorIssues[]

  constructor(msg: string, issues: IFormErrorIssues[]) {
    super(msg)
    this.issues = issues
  }
}
