import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function register() {
  return (
    <>
    <Head>
        <title>Đăng ký</title>
      </Head>
      <main className="login">
        <div className="spacing" />
        <div className="tcl-container">
          <div className="tcl-row">
            <div className="tcl-col-12 tcl-col-sm-6 block-center">
              <h1 className="form-title text-center">Login</h1>
              <div className="form-login-register">
                <form>
                  <div className="form-control">
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username ..." />
                  </div>
                  <div className="form-control">
                    <label>Password</label>
                    <i className="toggle-password ion-eye" />
                    <input type="password" placeholder="Enter Password ..." />
                  </div>
                  <div className="d-flex tcl-jc-between tcl-ais-center">
                    <button className="btn btn-primary btn-size-large">
                      Submit
                    </button>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="spacing" />
      </main>
    </>
  )
}
