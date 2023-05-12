import Link from "next/link";
import React, { useEffect } from "react";
import HeaderSearch from "./HeaderSearch";
import { useGlobalState } from "@/state";
import Cookies from 'js-cookie';


export default function Header() {
  const [user, setUser] = useGlobalState('currentUser')
  
  const cookie = Cookies.get('token')

  useEffect(() => {
    console.log(cookie);
    
  }, [cookie])

  return (
    <header id="header">
      <div className="tcl-container">
        <div className="tcl-row tcl-no-gutters header">
          <div className="tcl-col-2">
            {/* Logo */}
            <div className="header-logo">
              <Link href="/">
                <img src="assets/images/logo.png" alt="Go to homepage" />
              </Link>
            </div>
          </div>
          <HeaderSearch />
          <div className="tcl-col-6">
            {/* Nav */}
            <div className="header-nav">
              <ul className="header-nav__lists">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Our Team</a>
                  <ul>
                    <li>
                      <a href="#">Our Team 1</a>
                    </li>
                    <li>
                      <a href="#">Our Team 2</a>
                    </li>
                    <li>
                      <a href="#">Our Team 3</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Contact</a>
                  <ul>
                    <li>
                      <a href="#">Contact 1</a>
                    </li>
                    <li>
                      <a href="#">Contact 2</a>
                    </li>
                    <li>
                      <a href="#">Contact 3</a>
                      <ul>
                        <li>
                          <a href="#">Contact 11</a>
                        </li>
                        <li>
                          <a href="#">Contact 12</a>
                        </li>
                        <li>
                          <a href="#">Contact 13</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="header-nav__lists">
                {user === null && (
                  <li className="user">
                    <Link href="/login">
                      <i className="icons ion-person" /> Tài khoản
                    </Link>
                  </li>
                )}
                {user !== null && (
                  <li className="user">
                    <Link href="/profile">
                      <i className="icons ion-person" /> {user.name}
                    </Link>
                    <ul>
                      <li>
                        <Link href="/profile">Update Profile</Link>
                      </li>
                      <li>
                        <Link href="/change_password">Change Password</Link>
                      </li>
                      <li>
                        <Link href="/api/logOut">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
