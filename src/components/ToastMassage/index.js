import { Toast, ToastContainer } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ToastMassage.module.scss';

const cx = classNames.bind(styles);

function ToastMassage({ header, content, handleClose, isShow }) {
    return (
        <div className={cx('wrap')}>
            <ToastContainer className={cx('')}>
                <Toast onClose={handleClose} show={isShow} delay={3200} animation={true} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">{header}</strong>
                        <small>Vừa xong</small>
                    </Toast.Header>
                    <Toast.Body>
                        <span className={cx('content')}>{content}</span>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

export default ToastMassage;
