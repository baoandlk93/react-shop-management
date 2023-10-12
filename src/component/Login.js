import React, {useEffect, useRef} from "react";
import {Button} from 'primereact/button';
import {classNames} from 'primereact/utils';
import {Field, Form} from "react-final-form";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Checkbox} from "primereact/checkbox";
import {loginUser, selectAuthIsError, selectLoginSuccess, selectToken} from "../features/LoginSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";

function Login() {
    const dispatch = useDispatch();
    const loginSuccess = useSelector(selectLoginSuccess);
    const loginError = useSelector(selectAuthIsError);
    const isToken = useSelector(selectToken);
    const navigator = useNavigate();
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000});
    }

    useEffect(() => {
        if (loginSuccess) {
            showSuccess();
            setTimeout(() => {
                navigator("/")
            }, 1500)
        } else if (loginError) {
            showError();
        } else if (isToken) {
            navigator("/")
        }

    }, [loginSuccess, loginError]);

    const validate = (data) => {
        let errors = {};
        if (!data.username) {
            errors.username = 'Username is required.';
        }
        if (!data.password) {
            errors.password = 'Password is required.';
        }
        return errors;
    };

    const onSubmit = async (data, form) => {
        await dispatch(loginUser(data));
        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };


    return (
        <div className="form-demo">
            <Toast ref={toast}/>
            <div className="surface-card border-round shadow-2 p-4 align-content-center">
                <span className="text-900 text-2xl font-medium mb-4 block">Login </span>
                <Form onSubmit={onSubmit}
                      initialValues={{username: '', password: ''}}
                      validate={validate} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit} className="p-fluid">
                        <Field name="username" render={({input, meta}) => (
                            <div className="mb-5">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope"/>
                                    <InputText id="username" {...input}
                                               className={classNames({'p-invalid': isFormFieldValid(meta)})}/>
                                    <label htmlFor="username"
                                           className={classNames({'p-error': isFormFieldValid(meta)})}>Username *</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )}/>
                        <Field name="password" render={({input, meta}) => (
                            <div className="mb-5">
                                <span className="p-float-label">
                                    <Password id="password" {...input} toggleMask
                                              className={classNames({'p-invalid': isFormFieldValid(meta)})}/>
                                    <label htmlFor="password"
                                           className={classNames({'p-error': isFormFieldValid(meta)})}>Password*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )}/>
                        <Field name="accept" type="checkbox" render={({input, meta}) => (
                            <div className="mb-5 flex align-items-center">
                                <Checkbox inputId="accept" {...input}
                                          className={classNames('mr-3', {'p-invalid': isFormFieldValid(meta)})}/>
                                <label htmlFor="accept" className={classNames({'p-error': isFormFieldValid(meta)})}>I
                                    agree to the terms and conditions*</label>
                            </div>
                        )}/>
                        <Button type="submit" label="Submit" className="p-mt-2"/>
                    </form>
                )}/>
            </div>
        </div>
    );
}

export default Login;