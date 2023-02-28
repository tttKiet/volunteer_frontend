import React, { useEffect, useRef, useState } from 'react';

import styles from './HomeUserSLide.module.scss';
import gifUser from '../../assets/gif/user-home-2.gif';
import dog from '../../assets/images/home-user-and-dog.png';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function HomeUserSLide() {
    const elementRef = useRef(null);
    const title1 = useRef(null);
    const content = useRef(null);
    const headerImg = useRef(null);
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
                    entry.target.classList.add(cx('fadeIn'), cx('pulse'));
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        if (title1.current) {
            observer.observe(title1.current);
        }

        if (content.current) {
            observer.observe(content.current);
        }

        if (headerImg.current) {
            observer.observe(headerImg.current);
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
            className={cx('header-content', 'slide', {
                isVisible: isVisible,
            })}
            id="home"
        >
            <div>
                <h3 className={cx('title2')} ref={elementRef}>
                    Xin Chào Bùi Tuấn Kiệt!
                </h3>
                <h3 className={cx('title1')} ref={title1}>
                    "Trải nghiệm tình nguyện viên - Cùng chúng tôi lan tỏa yêu thương và sự đồng cảm đến mọi người"
                </h3>
                <span className={cx('content')} ref={content}>
                    Tình nguyện viên là những người có tâm huyết và mong muốn thay đổi thế giới bằng cách đóng góp cho
                    cộng đồng và xã hội. Tình nguyện viên không chỉ giúp đỡ người khác mà còn tạo nên những trải nghiệm
                    ý nghĩa và đáng nhớ cho chính bản thân họ.
                </span>
            </div>
            <div className={cx('header-img')}>
                <img src={dog} ref={headerImg}></img>
            </div>
        </div>
    );
}

export default HomeUserSLide;
