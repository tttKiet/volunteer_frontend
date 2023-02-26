import styles from './StatedUserSLide.module.scss';
import classNames from 'classnames/bind';
import { Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
const cx = classNames.bind(styles);

function StatedUserSLide() {
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
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <div className={cx('header-stated', 'slide')} ref={elementRef} id="stated">
            <h3 className={cx('title')}>Tham gia đội ngủ tình nguyện viên đầu tiên </h3>
            <div className={cx('row', 'g-5')}>
                <Col md={5}>
                    <div
                        className={cx('gr-step', {
                            animate: isVisible,
                        })}
                    >
                        <h3 className={cx('title1')}> 1</h3>
                        <div className={cx('content')}>
                            <h2>Mở giao diện người dùng</h2>
                            <span>
                                - Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào
                                biểu tượng dưới cùng bển trái
                            </span>
                        </div>
                    </div>

                    <div
                        className={cx('gr-step', {
                            animate: isVisible,
                        })}
                    >
                        <h3 className={cx('title1')}> 2</h3>
                        <div className={cx('content')}>
                            <h2>Mở giao diện người dùng</h2>
                            <span>
                                - Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào
                                biểu tượng dưới cùng bển trái
                            </span>
                        </div>
                    </div>

                    <div
                        className={cx('gr-step', {
                            animate: isVisible,
                        })}
                    >
                        <h3 className={cx('title1')}> 3</h3>
                        <div className={cx('content')}>
                            <h2>Mở giao diện người dùng</h2>
                            <span>
                                - Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào
                                biểu tượng dưới cùng bển trái
                            </span>
                        </div>
                    </div>
                </Col>

                <Col md={5}>
                    <div
                        className={cx('gr-step', {
                            animate: isVisible,
                        })}
                    >
                        <h3 className={cx('title1')}> 4</h3>
                        <div className={cx('content')}>
                            <h2>Mở giao diện người dùng</h2>
                            <span>
                                - Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào
                                biểu tượng dưới cùng bển trái
                            </span>
                        </div>
                    </div>

                    <div
                        className={cx('gr-step', {
                            animate: isVisible,
                        })}
                    >
                        <h3 className={cx('title1')}> 5</h3>
                        <div className={cx('content')}>
                            <h2>Mở giao diện người dùng</h2>
                            <span>
                                - Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào
                                biểu tượng dưới cùng bển trái
                            </span>
                        </div>
                    </div>

                    <div
                        className={cx('gr-step', {
                            animate: isVisible,
                        })}
                    >
                        <h3 className={cx('title1')}> 6</h3>
                        <div className={cx('content')}>
                            <h2>Mở giao diện người dùng</h2>
                            <span>
                                - Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào biểu tượng dưới cùng bển trái Nhấp vào
                                biểu tượng dưới cùng bển trái
                            </span>
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default StatedUserSLide;
