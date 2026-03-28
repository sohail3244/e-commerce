import AuthGuard from '@/components/common/AuthGuard'
import React from 'react'

export default function Profile() {
  return (
    <AuthGuard>
    <div>Profile</div>
    </AuthGuard>
  )
}
