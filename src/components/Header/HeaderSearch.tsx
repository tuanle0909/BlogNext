import Router from 'next/router';
import React, { useState } from 'react'
import Input from '../shared/Input'

type Props = {
  e: any
}
export default function HeaderSearch() {
  const [value, setValue] = useState('');
  function handleChangeValue(e: { target: { value: React.SetStateAction<string>; }; }) {
    setValue(e.target.value);
  }

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    Router.push(`/search?keyword=${value}`)
    setValue('')
  }
  
  return (
    <div className="tcl-col-4">
      {/* Header Search */}
      <form onSubmit={handleSubmit}>
        <Input type="search" onChange={handleChangeValue} value={value} placeholder="Nhap gia tri search ..." label={undefined} className={undefined} />
      </form>
    </div>
  )
}
