import Input from '@/components/shared/Input';
import { useGlobalState } from '@/state';
import Head from 'next/head'
import {useState} from 'react'
import styles from './login/login.module.css'
import Button from '@/components/shared/Button';
import userService from '@/service/user';
export default function change_password() {
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useGlobalState('currentUser')
    const [token] = useGlobalState('token') 
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const handleChangeValue = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
        ...formData,
        [name]: value,
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        userService.changePassword(formData.password, formData.newPassword, formData.confirmNewPassword, token).then(res => {
            console.log(res);
            
        })
    }

    return (
        <>
            <Head>
                <title>Thay đổi mật khẩu</title>
            </Head>
            <main className="login">
            <div className="spacing" />
            <div className="tcl-container">
            <div className="tcl-row">
                <div className="tcl-col-12 tcl-col-sm-6 block-center">
                <h1 className={`${styles['form-title']} text-center`}>Thay đổi mật khẩu</h1>
                <div className={styles["form-login-register"]}>
                    {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
                    <form autoComplete="off" onSubmit={handleSubmit}>
                    <Input
                        type="password"
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu ..."
                        name="password"
                        onChange={handleChangeValue} className={undefined}                  
                    />
                    <Input
                        type="password"
                        label="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới ..."
                        name="newPassword"
                        onChange={handleChangeValue} className={undefined}                  
                    />
                    <Input
                        type="password"
                        label="Xác nhận mật khẩu mới"
                        placeholder="Xác nhận mật khẩu mới ..."
                        name="confirmNewPassword"
                        onChange={handleChangeValue} className={undefined}                  
                    />
                    <div className="d-flex tcl-jc-between tcl-ais-center">
                        <Button type="primary" size="large" loading={loading} loadingPos={''} as={''} htmlType={undefined} className={''} onClick={undefined}>
                        Xác nhận
                        </Button>
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
