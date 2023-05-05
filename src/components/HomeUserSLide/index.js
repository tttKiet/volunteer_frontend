import React, { useEffect, useRef, useState } from 'react';
import BtnLgHomePrimary from '../BtnLgHomePrimary/BtnLgHomePrimary';

import styles from './HomeUserSLide.module.scss';
import gifUser from '../../assets/gif/user-home-2.gif';
import dog from '../../assets/images/home-user-and-dog.png';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function HomeUserSLide({ name, handleClickPar }) {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // entry.target.classList.add(cx('fadeIn'), cx('pulse'));
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={cx('header-content', 'slide', {
                isVisible: isVisible,
            })}
            id="home"
        >
            <div>
                <h3
                    className={cx('title2', {
                        isVisible: isVisible,
                    })}
                >
                    Xin Chào {name}!
                </h3>
                <h3 className={cx('title1')}>
                    "Trải nghiệm tình nguyện viên - Cùng chúng tôi lan tỏa yêu thương và sự đồng cảm đến mọi người"
                </h3>
                <span className={cx('content')}>
                    Tình nguyện viên là những người có tâm huyết và mong muốn thay đổi thế giới bằng cách đóng góp cho
                    cộng đồng và xã hội. Tình nguyện viên không chỉ giúp đỡ người khác mà còn tạo nên những trải nghiệm
                    ý nghĩa và đáng nhớ cho chính bản thân họ.
                </span>

                <div
                    className={cx('btn', {
                        isVisible: isVisible,
                    })}
                    onClick={handleClickPar}
                >
                    <BtnLgHomePrimary />
                </div>
            </div>
            <div
                className={cx('header-img', {
                    isVisible,
                })}
            >
                <img src={dog}></img>
            </div>
        </div>
    );
}

export default HomeUserSLide;
