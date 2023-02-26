import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { isLoginSelector, isManagerSelector } from '~/redux/selector';

import LayoutUser from '../layout/LayoutUser';
import HomeManager from './HomeManager';
import HomeUser from '../../components/HomeUser';
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

    return <>{isManager ? <HomeManager /> : <LayoutUser />}</>;
}

export default Home;
