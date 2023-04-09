import { useState, useRef, useEffect } from 'react';
import { UilEllipsisV, UilCancel } from '@iconscout/react-unicons';

import { workServices } from '~/services';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';
import ModalAuth from '../ModalAuth';
// scss
import classNames from 'classnames/bind';
import styles from './MorePost.module.scss';

const cx = classNames.bind(styles);

function MorePost({ id, handleDeletePost }) {
    const currUser = useSelector(userSelector);
    const [isShowModal, setIsShowModal] = useState(false);

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const handleShowMenu = () => {
        setShowMenu(true);
    };

    const toggleShowModal = () => {
        setIsShowModal((view) => !view);
    };

    const handleClickSubmit = async ({ id }) => {
        toggleShowModal();
        handleDeletePost({ id });
    };

    const handleClickMoreDel = () => {
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
            <div className={cx('more-icon')} onClick={handleShowMenu}>
                <UilEllipsisV size={18} />
            </div>

            {showMenu && (
                <div ref={menuRef} className={cx('more-menu')}>
                    <div className={cx('more-item')}>
                        <span>
                            <UilCancel size={18} />
                        </span>

                        <span>Sửa bài viết</span>
                    </div>
                    <div className={cx('more-item')} onClick={handleClickMoreDel}>
                        <span>
                            <UilCancel size={18} />
                        </span>

                        <span>Xóa bài viết</span>
                    </div>
                </div>
            )}
            <ModalAuth
                header="Bạn có chắc muốn xóa?"
                main="Hành động này sẽ xóa bài viết vĩnh viễn!"
                isShowModal={isShowModal}
                handleOk={handleClickSubmit}
                ToggleShowModal={toggleShowModal}
                deleteId={id}
            />
        </div>
    );
}

export default MorePost;
