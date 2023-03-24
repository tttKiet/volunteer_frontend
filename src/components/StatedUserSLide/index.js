import arrowImg from '../../assets/images/arrow.jpg';
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
                <Col
                    md={6}
                    className={cx('item', {
                        animate: isVisible,
                    })}
                >
                    <div className={cx('gr-step')}>
                        <h3 className={cx('title1')}> 1</h3>
                        <div className={cx('content')}>
                            <h2>Đăng nhập vào hệ thống</h2>
                            <span>
                                Tiến hành đăng nhập vào hệ thống
                                <p>Đã xong</p>
                            </span>
                        </div>
                    </div>
                </Col>
                <Col
                    md={6}
                    className={cx('item', {
                        animate: isVisible,
                    })}
                >
                    <div className={cx('gr-step')}>
                        <h3 className={cx('title1')}> 2</h3>
                        <div className={cx('content')}>
                            <h2>Mở giao diện</h2>
                            <span>Nhấp nút mũi tên để mở cửa sổ làm việc (nằm ở gốc trái bên dưới)</span>
                        </div>
                    </div>
                </Col>
                <Col
                    md={6}
                    className={cx('item', {
                        animate: isVisible,
                    })}
                >
                    <div className={cx('gr-step')}>
                        <h3 className={cx('title1')}> 3</h3>
                        <div className={cx('content')}>
                            <h2>Tìm kiếm thông tin phù hợp</h2>
                            <span>
                                Tiếp đó, bạn có thể xem các bài đăng của các Admin để xem công việc tình nguyện phù hợp
                            </span>
                        </div>
                    </div>
                </Col>

                <Col
                    md={6}
                    className={cx('item', {
                        animate: isVisible,
                    })}
                >
                    <div className={cx('gr-step')}>
                        <h3 className={cx('title1')}> 4</h3>
                        <div className={cx('content')}>
                            <h2>Đăng ký tham gia</h2>
                            <span>
                                Sau khi đọc được thông tin cần thiết ở bước trên (có thể bỏ qua bước này), ấn "Xem danh
                                mục công việc" và sau đó đăng ký công việc phù hợp.
                            </span>
                        </div>
                    </div>
                </Col>

                <Col
                    md={6}
                    className={cx('item', {
                        animate: isVisible,
                    })}
                >
                    <div className={cx('gr-step')}>
                        <h3 className={cx('title1')}> 5</h3>
                        <div className={cx('content')}>
                            <h2>Kiểm tra thông tin</h2>
                            <span>Bạn có thể kiểm tra thông tin đăng ký của bạn trong phần "Xem lịch tham gia"</span>
                        </div>
                    </div>
                </Col>

                <Col
                    md={6}
                    className={cx('item', {
                        animate: isVisible,
                    })}
                >
                    <div className={cx('gr-step')}>
                        <h3 className={cx('title1')}> 6</h3>
                        <div className={cx('content')}>
                            <h2>Thực hiện công việc</h2>
                            <span>
                                Đến ngày được công bố, bạn cần đến đúng nơi và làm đúng quy định của công việc bạn đăng
                                ký để được quyền lợi về điểm rèn luyện... Chúc bạn thành công!
                            </span>
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default StatedUserSLide;
