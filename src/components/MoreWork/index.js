import { useState, useRef, useEffect } from 'react';
import { UilEllipsisV, UilCancel } from '@iconscout/react-unicons';

import { workServices } from '~/services';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';
import ModalAuth from '../ModalAuth';
import ToastMassage from '../ToastMassage';
// scss
import classNames from 'classnames/bind';
import styles from './MoreWork.module.scss';

const cx = classNames.bind(styles);

function MoreWork({ id, getWorks }) {
    const currUser = useSelector(userSelector);
    const [isShowModal, setIsShowModal] = useState(false);

    const [toastOb, setToastOb] = useState({
        show: false,
        header: '',
        content: '',
    });

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const handleShowMenu = () => {
        setShowMenu(true);
    };

    const toggleShowToast = ({ header, show, content }) => {
        setToastOb((toastOb) => {
            return {
                header: header ? header : '',
                content: content ? content : '',
                show: show ? show : !toastOb.show,
            };
        });
    };

    const toggleShowModal = () => {
        setIsShowModal((view) => !view);
    };
    const handleDeleteRow = async ({ id }) => {
        toggleShowModal();
        const res = await workServices.handleDeleteWorkRegister({
            id,
            isAdmin: currUser.type === 'Admin',
            userId: currUser.id,
        });
        if (res.errCode === 0) {
            getWorks({ header: 'Xong', content: 'Hủy tham gia thành công' });
        } else if (res.errCode === 2) {
            toggleShowToast({ header: 'Cảnh báo!!!', content: res.errMessage });
        }
    };

    const handleClickMore = () => {
        toggleShowModal();
    };

    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
        };
    }, [menuRef]);

    return (
        <div className={cx('wrap')}>
            <ToastMassage
                dur={4200}
                isShow={toastOb.show}
                header={toastOb.header}
                content={toastOb.content}
                handleClose={() => toggleShowToast({})}
            />
            <div className={cx('more-icon')} onClick={handleShowMenu}>
                <UilEllipsisV size={18} />
            </div>
            {showMenu && (
                <div ref={menuRef} className={cx('more-menu')}>
                    <div className={cx('more-item')} onClick={handleClickMore}>
                        <span>
                            <UilCancel size={18} />
                        </span>

                        <span>Hủy tham gia</span>
                    </div>
                </div>
            )}
            <ModalAuth
                header="Bạn có chắc muốn xóa?"
                main="Hành động này sẽ xóa bản ghi trong cơ sở dữ liệu và không thể khôi phục"
                isShowModal={isShowModal}
                handleOk={handleDeleteRow}
                ToggleShowModal={toggleShowModal}
                deleteId={id}
            />
        </div>
    );
}

export default MoreWork;
