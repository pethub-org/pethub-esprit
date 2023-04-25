import React from 'react'

const MyMessage = ({message}) => {
  return (
      <>
          <div className='w-full h-max' style={{ width: 'full', height: 'max-content' }}>
                <div className='flex items-center justify-end m-5 'style={{
                  display:'flex',
                  alignItems: 'center',
          justifyContent: 'flex-end',
                  margin:'16px'
                }}>
                  <p className='h-max w-max p-2 rounded-md bg-blue-500 text-white'
                  style={{
                      height:'max-content',
            width: 'max-content',
            // borderRadius: '25%',
            backgroundColor: '#5271ff',
                    color: 'white',
                      padding:'10px'
                    }}>{message}</p>
                </div>
            </div>
        </>
  )
}

export default MyMessage