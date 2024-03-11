import TimeForm from '@/components/TimeForm'
import React from 'react'
import { getEmployees, getEmployeeClocks } from '@/lib/directus'
interface IEmployees {
  id: string,
  employee_pin: string,
  Employee_Username: string,
  employee_icon: string,
  employee_name: string,
  Clock_Status: boolean,
  bcrypt: string

}
interface ClockData {
  id: string;
  Clock_User: string;
  Clock_In_Timestamp: string;
  Clock_Out_Timestamp: string;
}

export default async function page() {

  const data = await getEmployees()
  const recent = await getEmployeeClocks()

  const employees = data!.map((employee: IEmployees) => {
    return employee
  })

  const clocks = recent!.map((clock: ClockData) => {
    return clock
  })

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <TimeForm data={employees} url={process.env.API_URL!} clocks={clocks} />
    </div>
  )
}
