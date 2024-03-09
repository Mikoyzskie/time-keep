import TimeForm from '@/components/TimeForm'
import React from 'react'
import { getEmployees, timeIn } from '@/lib/directus'
interface IEmployees {
  id: string,
  employee_pin: string,
  Employee_Username: string,
  employee_icon: string,
  employee_name: string
}

interface IData {
  data: IEmployees
}

export default async function page() {

  const data = await getEmployees()
  // console.log(data);

  const test = data!.map((employee: IEmployees) => {
    return employee
  })


  return (
    <div className='flex items-center justify-center min-h-screen'>
      <TimeForm data={test} url={process.env.API_URL!} />
    </div>
  )
}
