import React from 'react'

const SplitRequestNotify = () => {

    const data = {
        userName:'Hex',
        profileImg:'',
        message: 'added you to "test" split of ₹50'
    }

  return (

    <div className='flex items-start gap-3 rounded-md py-5 px-5'>

        {
            data.profileImg? (
                <div className='h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                    <img 
                        src={data.profileImg} 
                        alt="profile"
                        className='h-full w-full object-cover'
                    />
                </div>
            )

            : (

                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] 
                text-sm font-medium text-white'
                >
                    {data?.userName?.charAt(0)?.toUpperCase()}
                </div>
            )

        }

          <div className='min-w-0 space-y-3'>
              <div>
                  <div className='flex items-center gap-2'>
                      <span className='font-medium'>{data.userName}</span>
                      <span className='text-sm text-[var(--text-secondary)]'>4h ago</span>
                  </div>

                  <p className='break-words text-sm'>{data.message}</p>
              </div>

              <div className='flex flex-wrap gap-2'>
                  <button
                      type='button'
                      className='rounded-md border border-[var(--border-color)] bg-transparent px-5 py-2 
                      text-sm hover:bg-[var(--surface-hover)] cursor-pointer'
                  >
                      Decline
                  </button>

                  <button
                      type='button'
                      className='rounded-md bg-[var(--primary)] px-5 py-2 text-sm text-white hover:opacity-90 
                      cursor-pointer'
                  >
                      Accept
                  </button>
              </div>
          </div>

    </div>

  )
}

export default SplitRequestNotify