import TimeForm from '@/components/TimeForm'
import React from 'react'

interface IEmployees {
  id: string,

}

export default function page() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <TimeForm />
    </div>
  )
}
