import CraneCanvas from '@/components/molecules/CraneCanvas/CraneCanvas'
import useSWR from 'swr'
import React from 'react'

import type CraneModule from '@/modules/crane'

const CRANE_API = '/api/cranes'

const fetcher = async (url: string) => await fetch(url).then(async (res) => await res.json())

async function patchCrane (crane: CraneModule) {
  await fetch(CRANE_API, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(crane)
  })
}

export default function CraneMainDashboard () {
  const { data, error, isLoading } = useSWR<{ cranes?: CraneModule[] }>(CRANE_API, fetcher)

  return (
    <div className={'flex columns-2 h-full w-full gap-8'}>
      <div className={'w-2/3 h-full border-2'}>
        <CraneCanvas data={data?.cranes ?? []} />
      </div>
      <div className={'border-2 p-8 w-1/3'}>
        <button onClick={() => {
          if (data?.cranes) {
            void patchCrane(data.cranes[0]).then(() => {
              console.log('Crane Patched')
            })
          }
        }}>
          Animate Crane 1
        </button>
      </div>
    </div>
  )
}
