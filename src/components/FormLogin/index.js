import { Form, Button } from 'react-bootstrap';

import styles from './FormLogin.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function FormLogin() {
    return (
        <Form className={cx('form')}>
            <h2 className={cx('title')}>Đăng Nhập</h2>
            <fieldset>
                <div className={cx('wrap-input')}>
                    <Form.Group className={cx('mb-4', 'form-gr')}>
                        <Form.Label htmlFor="user">User:</Form.Label>
                        <Form.Control id="user" placeholder="Nhập User" />
                    </Form.Group>
                    <Form.Group className={cx('mb-4', 'form-gr')}>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control type="password" id="password" placeholder="Nhập Password" />
                    </Form.Group>

                    <Form.Group className="mb-1 d-flex align-items-center">
                        <Form.Check id="check-miss" checked style={{ cursor: 'pointer' }} />
                        <Form.Label
                            htmlFor="check-miss"
                            className="mx-3"
                            style={{ fontSize: '14px', margin: 0, cursor: 'pointer' }}
                        >
                            Nhớ tôi
                        </Form.Label>
                    </Form.Group>
                </div>
                <Button className={cx('btn-submit', 'btn-lg')} type="submit">
                    Đăng nhập
                </Button>
            </fieldset>
        </Form>
    );
}

export default FormLogin;
