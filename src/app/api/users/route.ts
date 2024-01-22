import { object, string } from 'zod'
import { convertFormDataToObj } from '@/helpers/formHelpers'
import userService from '@/services/user'
import { FormError } from '@/errors/FormError'

const addUserRequestSchema = object({
  username: string({
    required_error: 'Username is required',
    invalid_type_error: 'Username is a string',
    description: 'Unique username in the system'
  }),
  firstName: string().optional(),
  lastName: string().optional(),
  password: string().min(8),
  confirmPassword: string().min(8),
  email: string({
    required_error: 'Email is required',
    invalid_type_error: 'Email is a string',
    description: 'Email address'
  }).email()
})
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
    const containsLowercase = (ch: string) => /[a-z]/.test(ch)
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch)
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0
    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i)
      if (!isNaN(+ch)) countOfNumbers++
      else if (containsUppercase(ch)) countOfUpperCase++
      else if (containsLowercase(ch)) countOfLowerCase++
      else if (containsSpecialChar(ch)) countOfSpecialChar++
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message:
          'password does not meet complexity requirements. You must have at least, 1 number, 1 upper case, 1 special character',
        path: ['password']
      })
    }
  })
  .superRefine((obj, check) => {
    if (obj.password !== obj.confirmPassword) {
      check.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['password', 'confirmPassword']
      })
    }
  })

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const userObj = convertFormDataToObj(data)
    const parsedUserObj = addUserRequestSchema.parse(userObj)

    // check if the username already exists
    if (await userService.userExists(parsedUserObj.username)) {
      console.log('user already exists')
      throw new FormError('User already exists', [
        {
          path: ['username'],
          message: 'Username already in-use',
          code: 'custom'
        }
      ])
    }
    // user request has been validated, username is not in use, lets make the user
    return Response.json(
      await userService.createUser(
        parsedUserObj.username,
        parsedUserObj.password,
        parsedUserObj.email
      ),
      {
        status: 200
      }
    )
  } catch (err) {
    return Response.json(
      {
        success: false,
        issues: (err as any)?.issues
      },
      {
        status: 400
      }
    )
  }
}
