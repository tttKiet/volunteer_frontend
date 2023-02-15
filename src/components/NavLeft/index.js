import { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './NavLeft.module.scss';
import MenuMoreProfice from '~/components/MenuMoreProfice';
import { UilEllipsisV } from '@iconscout/react-unicons';
const cx = classNames.bind(styles);

function NavLeft({ menu }) {
    const [isShowMenuMore, setIsShowMenuMore] = useState(false);

    const handleClickMore = () => {
        setIsShowMenuMore((isShowMenuMore) => !isShowMenuMore);
    };

    const handleWindowCLick = useCallback(() => {
        window.onclick = (e) => {
            if (e.target.closest('.more')) {
                handleClickMore();
            } else {
                setIsShowMenuMore(false);
            }
        };
    }, []);

    useEffect(() => {
        handleWindowCLick();
    }, [handleWindowCLick]);

    return (
        <div className={cx('wrap')}>
            <span className={cx('title-main')}>{menu.title}</span>
            <ul className={cx('controler')}>
                {menu.desc.map((menu, id) => {
                    const Icon = menu.icon;
                    return (
                        <li key={id} className={cx('item-link')}>
                            <a href={menu.to}>
                                <div>
                                    <Icon size="30" className={cx('icon')} />
                                </div>
                                <h3 className={cx('title')}>{menu.title}</h3>
                            </a>
                        </li>
                    );
                })}

                <li className={cx('item-link', 'more')}>
                    <span>
                        <UilEllipsisV size="30" className={cx('icon')} />
                        <h3 className={cx('title')}>Xem thêm</h3>
                    </span>
                    <MenuMoreProfice handleClickMore={handleClickMore} show={isShowMenuMore} />
                </li>
            </ul>
        </div>
    );
}

export default NavLeft;
