import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import PasswordInputField from '../../components/PasswordInputField';

const ChangePinForm = () => {

  const formData = [
    {
      label: 'Current Pin',
      placeholder: 'Current Pin'
    },
    {
      label: 'New Pin',
      placeholder: 'New Pin'
    },
    {
      label: 'Confirm Pin',
      placeholder: 'Confirm Pin'
    }
  ]

  return (
    <div className='w-full h-full flex flex-col'>

      <div className='w-full flex gap-5 py-5 px-5 border-b border-[var(--border-color)]'>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='cursor-pointer'
        >
          <IoArrowBackOutline className="text-xl" />
        </button>
      </div>

      <div className='flex flex-1 justify-center'>
        <form className='w-full md:max-w-md h-full flex flex-col justify-between md:justify-start gap-8 p-5'>

          <div className='flex flex-col gap-3'>

            {formData.map((data, i)=>(
              <PasswordInputField label={data.label} placeholder={data.placeholder} inpId={i}/>
            ))}

          </div>

          <button
            type='submit'
            className='w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white p-2 
            rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Change Pin
          </button>


        </form>

      </div>

    </div>
  )
}

export default ChangePinForm