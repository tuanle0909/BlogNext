import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input';
import userService from '@/service/user';
import { useGlobalState } from '@/state';
import Head from 'next/head';
import React, { useState } from 'react'

export default function profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading, setIsLoading] = useState(false)
  const [desc, setDesc] = useState('')
  const [ava, setAva] = useState('')
  const [token] = useGlobalState('token')

  function handleChangeValue(e: any) {
    setSelectedFile(e.target.files[0]);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!selectedFile) return;
    if (isloading) return
    setIsLoading(true)
    let formData = new FormData();
    formData.append('file', selectedFile);
    const avaId = await userService.uploadMedia(formData, token)
    if (avaId) {
      userService.uploadProfile(desc, avaId.id, token).then(res => {
        console.log(res);
      })
    }
    
      // if (res.id) {
      //   const data = {
      //     description: desc,
      //     simple_local_avatar: {
      //       media_id: res.id
      //     }
      //   }
      //   userService.uploadProfile(data, token).then((res) => {
      //     console.log(res);
      //     setSelectedFile(null)
      //     setIsLoading(false)
      //   })
      // } else {
      //   console.log('lỗi');
      // }
  }

  return (
    <>
        <Head>
            <title>Profile</title>
        </Head>
        <main className="login">
            <div className="spacing" />
            <div className="tcl-container">
                <div className="tcl-row">
                <div className="tcl-col-12 tcl-col-sm-6 block-center">
                    <h1 className="form-title text-center">Cập nhật thông tin</h1>
                    <div className="form-login-register">
                    <form autoComplete="off">
                        {selectedFile && <img src={URL.createObjectURL(selectedFile)} />}
                        <input type="file" onChange={handleChangeValue} />
                        <Input
                          label="Mô tả"
                          placeholder="Nhập mô tả ..."
                          autoComplete="off"
                          name="username"
                          onChange={(e: any) => setDesc(e.target.value)} className={undefined}                  
                        />
                    </form>
                    <div className="d-flex tcl-jc-between tcl-ais-center">
                      <Button type="primary" size="large" loading={isloading} loadingPos={''} as={''} htmlType={undefined} className={''}  onClick={handleSubmit}>
                          Cập nhật
                      </Button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="spacing" />
        </main>
    </>
  )
}
