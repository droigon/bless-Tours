'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link";
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
  } from "@heroicons/react/24/outline";
interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  dataLength: number
  url: string
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    dataLength,
    url,
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('limit') ?? '6'

  return (
    <>
        <div className="col-span-12">
            <div className="p-6 bg-white rounded-2xl my-10">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <button
                    className="link flex items-center clr-neutral-500 hover:text-primary gap-1 order-1"
                    disabled={!hasPrevPage}
                    onClick={() => {
                        router.push(`${url}?page=${Number(page) - 1}&limit=${per_page}`)
                    }}>
                    <ArrowLongLeftIcon className="w-5 h-5" />
                    <span className="inline-block font-semibold">
                      Prev Tour
                    </span>
                  </button>

                  <div className="flex flex-wrap gap-3 justify-center order-3 flex-grow md:order-2">
                  {page} / {Math.ceil(dataLength / Number(per_page))}
                  </div>
                  <button
                    className="link flex items-center clr-neutral-500 hover:text-primary gap-1 order-2"
                    disabled={!hasNextPage}
                    onClick={() => {
                        router.push(`${url}?page=${Number(page) + 1}&limit=${per_page}`)
                    }}>
                    <span className="inline-block font-semibold">
                      Next Tour
                    </span>
                    <ArrowLongRightIcon className="w-5 h-5" />
                  </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default PaginationControls
