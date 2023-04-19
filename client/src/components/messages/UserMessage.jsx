import React from 'react'

const UserMessage = ({logo,message}) => {
  return (
        <>
            <div className='w-full h-max' style={{width:'full',height:'max-content'}}>
        <div className='flex items-center justify-self-start m-5' style={{
                  display:'flex',
                  alignItems: 'center',
          justifyContent: 'flex-start',
                  margin:'16px'
                }}>
                    <img src={logo} alt="" className='w-9 rounded-md mr-2' style={{width:'18px', borderRadius:'25%' , marginRight:'4px'}} />
          <p className='h-max w-max p-2 rounded-md bg-slate-500 text-white' style={{
                      height:'max-content',
            width: 'max-content',
            borderRadius: '25%',
            backgroundColor: '#c3c3c3',
                      color:'white'
                    }}>{message}</p>
                </div>
            </div>
        </>
  )
}

export default UserMessage