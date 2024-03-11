import React from 'react'
import { Button } from './ui/button'
import { timeIn } from '@/lib/directus'

export default function TimeInButton({ id }: { id: string }) {

    async function TimeIn() {
        const test = await timeIn(id)
        console.log(test);

    }

    return (
        <Button onClick={TimeIn}>
            Continue
        </Button>
    )
}
