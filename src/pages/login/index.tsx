import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import fetch from "isomorphic-fetch";
import { useGlobalState } from "@/state";
import userService from "@/service/user";
import styles from './login.module.css'

export default function login() {

  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useGlobalState('currentUser')
  const [token, setToken] = useGlobalState('token') 

  function handleChangeValue(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const body = JSON.stringify(formData)
    const method = "POST"
    setLoading(true);
    fetch('/api/login', {
      body,
      method,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(async res => {
      if (res.code) {
        setLoading(false)
        setFormError('Thông tin đăng nhập không chính xác')
        return new Promise(resolve => {
          setTimeout(resolve, 3000)
        }).then(() => {
          setFormError('')
        })
      } else if (res.status === 500) {
        setLoading(false)
        setFormError('Có lỗi xảy ra vui lòng thử lại sau  ')
        return new Promise(resolve => {
          setTimeout(resolve, 3000)
        }).then(() => {
          setFormError('')
        })
      } else {
        setToken(res.token)
        await userService.fetchMe(res.token).then((res) => {
          setUser(res)
        })
        setLoading(false)
        router.push('/')
      }
    })
  }

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <main className="login">
        <div className="spacing" />
        <div className="tcl-container">
          <div className="tcl-row">
            <div className="tcl-col-12 tcl-col-sm-6 block-center">
              <h1 className={styles["form-title text-center"]}>Login</h1>
              <div className={styles["form-login-register"]}>
                {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <Input
                    label="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập ..."
                    autoComplete="off"
                    name="username"
                    onChange={handleChangeValue} className={undefined}                  
                  />
                  <Input
                    type="password"
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu của bạn ..."
                    autoComplete="new-password"
                    name="password"
                    onChange={handleChangeValue} className={undefined}                  
                  />
                  <div className="d-flex tcl-jc-between tcl-ais-center">
                    <Button type="primary" size="large" loading={loading}>
                      Đăng nhập
                    </Button>
                    <Link href="/register">Đăng ký</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="spacing" />
      </main>
    </>
  );
}

