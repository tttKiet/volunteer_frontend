import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { isLoginSelector, isManagerSelector } from '~/redux/selector';

import HomeManager from './HomeManager';
import HomeUser from './HomeUser';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const isManager = useSelector(isManagerSelector);
    const isLogined = useSelector(isLoginSelector);
    const navigate = useNavigate();

    const handleNavigate = useCallback(() => {
        if (!isLogined) {
            navigate('/login');
        }
    }, [isLogined, navigate]);

    useEffect(() => {
        handleNavigate();
    }, [handleNavigate, isLogined]);

    return <div className={cx('wrap')}>{isManager ? <HomeManager /> : <HomeUser />}</div>;
}

export default Home;
