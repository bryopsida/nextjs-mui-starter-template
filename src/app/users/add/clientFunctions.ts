'use client'
import { FormError } from '@/errors/FormError'
import { FormEvent } from 'react'

export function getPageTitle(): string {
  return 'Add User'
}

export async function addUser(
  formEvt: FormEvent<HTMLFormElement>
): Promise<any> {
  formEvt.preventDefault()
  const formData = new FormData(formEvt.currentTarget)
  const response = await fetch('/api/users', {
    method: 'POST',
    body: formData
  })
  const dataResp = await response.json()
  if (response.status !== 200) {
    throw new FormError('Invalid Form Submission', dataResp.issues)
  }
}
