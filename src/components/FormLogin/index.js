import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducers';
import { Form, Button } from 'react-bootstrap';
import { userServices } from '~/services';

import Loader from '../Loader';
import styles from './FormLogin.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function FormLogin() {
    const btnSubmitRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogined, setIsLogined] = useState(false);
    const [isCheckBox, setIsCheckBox] = useState(true);
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [errInput, setErrInput] = useState('');
    const [isLoader, setIsloader] = useState(false);

    const handleChange = (e, type) => {
        if (type === 'user') {
            setUserInput(e.target.value);
        } else if (type === 'pass') {
            setPassInput(e.target.value);
        } else if (type === 'checkbox') {
            setIsCheckBox((isCheckBox) => !isCheckBox);
        }
    };

    const handleClickSubmit = async () => {
        if (!userInput) {
            return setErrInput('Bạn chưa nhập User!');
        }
        if (!passInput) {
            return setErrInput('Bạn chưa nhập mật khẩu!');
        }

        if (userInput && passInput) {
            setIsloader(true);
            var idLoader = await setTimeout(async () => {
                const res = await userServices.login(userInput, passInput);
                setIsloader(false);
                setErrInput(res.errMessage);
                clearTimeout(idLoader);
                if (res.errCode === 0) {
                    saveUserLogin(res.userData);
                }
            }, 500);
        }
    };

    const saveUserLogin = (data) => {
        dispatch(userSlice.actions.saveUserLogin(data));
        dispatch(userSlice.actions.toggleUserLogin(true));

        setIsLogined(true);
    };

    const handleNavigate = useCallback(() => {
        if (isLogined) {
            navigate('/');
        }
    }, [isLogined, navigate]);

    const handleKeyDownSubmit = (e) => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') btnSubmitRef.current.click();
        });
    };

    useEffect(() => {
        handleNavigate();
        handleKeyDownSubmit();
    }, [handleNavigate, isLogined]);

    return (
        <>
            {isLoader && <Loader />}
            <Form className={cx('form')}>
                <h2 className={cx('title')}>Đăng Nhập</h2>
                <fieldset>
                    <div className={cx('wrap-input')}>
                        <Form.Group className={cx('mb-4', 'form-gr')}>
                            <Form.Control
                                id="user"
                                onChange={(e) => handleChange(e, 'user')}
                                autoComplete="off"
                                value={userInput}
                            />
                            <Form.Label className={cx('title-input')} htmlFor="user">
                                Tên đăng nhập
                            </Form.Label>
                        </Form.Group>
                        <Form.Group className={cx('mb-1', 'form-gr')}>
                            <Form.Control
                                type="password"
                                onChange={(e) => handleChange(e, 'pass')}
                                value={passInput}
                                id="password"
                            />
                            <Form.Label className={cx('title-input')} htmlFor="password">
                                Mật khẩu
                            </Form.Label>
                        </Form.Group>

                        <Form.Group className="my-4 d-flex align-items-center justify-content-between">
                            <Form.Group className="d-flex align-items-center">
                                <Form.Check
                                    checked={isCheckBox}
                                    onChange={(e) => handleChange(e, 'checkbox')}
                                    id="check-miss"
                                    style={{ cursor: 'pointer' }}
                                />
                                <Form.Label
                                    htmlFor="check-miss"
                                    className="mx-3"
                                    style={{ fontSize: '14px', margin: 0, cursor: 'pointer' }}
                                >
                                    Nhớ tôi
                                </Form.Label>
                            </Form.Group>
                            <span className={cx('err')}>{errInput}</span>
                        </Form.Group>
                    </div>
                    <div className={cx('submit')}>
                        <Button className={cx('btn-submit', 'btn-lg')} ref={btnSubmitRef} onClick={handleClickSubmit}>
                            Đăng nhập
                        </Button>
                    </div>
                </fieldset>
            </Form>
        </>
    );
}

export default FormLogin;
