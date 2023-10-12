import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {OverlayPanel} from "primereact/overlaypanel";
import {Menubar} from "primereact/menubar";
import {Sidebar} from "primereact/sidebar";
import {useNavigate} from "react-router-dom";
import {logoutUser, selectLoginSuccess, selectToken} from "../../../features/LoginSlice";
import {useDispatch, useSelector} from "react-redux";
import {SplitButton} from "primereact/splitbutton";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";
import {PrimeReactContext} from "primereact/api";
import {TabMenu} from "primereact/tabmenu";

function Header(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const op = useRef(null);
    const navigator = useNavigate();
    const isToken = useSelector(selectToken)
    const isLogin = useSelector(selectLoginSuccess)
    const {changeTheme} = useContext(PrimeReactContext);
    useEffect(() => {
        console.log("da render lai")
        console.log(isLogin)
    }, [isToken]);
    const register = () => {
        op.current.hide();
        navigator("/register")
    }
    const login = () => {
        navigator("/login")
    }
    const accept = async () => {
        await dispatch(logoutUser());
        toast.current.show({severity: 'info', summary: 'Logout success !', detail: 'See you again', life: 3000});
        setTimeout(() => {
            navigator("/")
        }, 1000)
    }
    const reject = () => {
        toast.current.show({severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000});
    }
    const logout = async (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to logout?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });


    }
    const itemsEndNavbar = [
        {
            label: 'Login',
            icon: 'pi pi-user',
            command: () => {
                navigator("/login")
            }
        },
        {
            label: 'Register',
            icon: 'pi pi-user-plus',
            command: () => {
                navigator("/register")
            }
        }
    ];
    const itemsStartNavbar = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => {
                navigator('/')
            }
        },
        {
            label: 'Shop',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                navigator('/shop')
            }
        },
        {label: 'Chart', icon: 'pi pi-fw pi-chart',command: () => navigator("/chart")},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-spin pi-cog', command: () => setVisibleRight(true)}
    ];
    const [loading, setLoading] = useState(false);

    const startNavbar = () => {
        return (
            <div className="p-inputgroup h-full">
                <TabMenu model={itemsStartNavbar}
                         activeIndex={activeIndex}
                         onTabChange={(e) => setActiveIndex(e.index)}/>
            </div>
        )
    }
    const endNavbar = () => {
        return (
            <>
                {(isToken === null) ?
                    <SplitButton
                        severity={"info"}
                        label="User"
                        icon="pi pi-user"
                        model={itemsEndNavbar}
                        loading={loading}/>
                    :
                    <Button
                        text
                        size="large"
                        outlined
                        icon="pi pi-sign-out"
                        label="Logout"
                        onClick={logout}
                    />
                }
            </>
        )
    }
    const [visibleRight, setVisibleRight] = useState(false);
    return (
        <div className="card flex flex-wrap pt-0 mt-0 justify-content-center">
            <Toast ref={toast}/>
            <ConfirmPopup/>
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <h2>Right Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </Sidebar>
            <OverlayPanel ref={op}>
                <div className="block align-items-center w-12 ">
                    <div className="field">
                        <Button
                            type="button"
                            icon="pi pi-user"
                            label="Login"
                            severity="Primary"
                            rounded={false}
                            onClick={login}/>
                    </div>
                    <div className="field align-items-center ">
                        <strong>Or</strong>
                    </div>
                    <div className="field">
                        <Button
                            type="button"
                            icon="pi pi-user-plus"
                            severity="help"
                            label="Register"
                            onClick={register}/>
                    </div>


                </div>
            </OverlayPanel>
            <Menubar
                className="w-full left-0 right-0 p-0 pr-6"
                start={startNavbar}
                end={endNavbar}/>

        </div>
    )
}

export default Header;
