import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducers';
import { Form, Button } from 'react-bootstrap';
import Loader from '../Loader';
import { userServices } from '~/services';
import styles from './FormLogin.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function FormLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogined, setIsLogined] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [errInput, setErrInput] = useState('');
    const [isLoader, setIsloader] = useState(false);

    const handleChange = (e, type) => {
        if (type === 'user') {
            setUserInput(e.target.value);
        } else if (type === 'pass') {
            setPassInput(e.target.value);
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

    useEffect(() => {
        handleNavigate();
    }, [handleNavigate, isLogined]);

    return (
        <>
            {isLoader && <Loader />}
            <Form className={cx('form')}>
                <h2 className={cx('title')}>Đăng Nhập</h2>
                <fieldset>
                    <div className={cx('wrap-input')}>
                        <Form.Group className={cx('mb-4', 'form-gr')}>
                            <Form.Label htmlFor="user">User:</Form.Label>
                            <Form.Control
                                id="user"
                                onChange={(e) => handleChange(e, 'user')}
                                value={userInput}
                                placeholder="Nhập User"
                            />
                        </Form.Group>
                        <Form.Group className={cx('mb-1', 'form-gr')}>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => handleChange(e, 'pass')}
                                value={passInput}
                                id="password"
                                placeholder="Nhập Password"
                            />
                        </Form.Group>

                        <Form.Group className="my-4 d-flex align-items-center justify-content-between">
                            <Form.Group className="d-flex align-items-center">
                                <Form.Check id="check-miss" style={{ cursor: 'pointer' }} />
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
                    <Button className={cx('btn-submit', 'btn-lg')} onClick={handleClickSubmit}>
                        Đăng nhập
                    </Button>
                </fieldset>
            </Form>
        </>
    );
}

export default FormLogin;
