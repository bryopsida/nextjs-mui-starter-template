'use client'
import { usePathname } from 'next/navigation'
import { getPageTitle as getAddUserPageTitle } from '@/app/users/add/clientFunctions'
import { getPageTitle as getUsersPageTitle } from '@/app/users/clientFunctions'

function getTheTitleString(pageRoute: string): string {
  switch (pageRoute) {
    case '/users':
      return getUsersPageTitle()
    case '/users/add':
      return getAddUserPageTitle()
    default:
      return ''
  }
}

export default function PageTitle() {
  return <h3>{getTheTitleString(usePathname())}</h3>
}
