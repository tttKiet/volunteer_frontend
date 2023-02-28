import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import contact from '../../assets/images/contact.png';
import styles from './ContactUserSLide.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ContactUserSLide() {
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
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(elementRef.current);
            }
        };
    }, []);
    return (
        <div
            ref={elementRef}
            className={cx('header-contact', 'slide', {
                isVisible: isVisible,
            })}
            id="contact"
        >
            <div className={cx('row', 'g-5')}>
                <Col md={5}>
                    <div className={cx('image')}>
                        <img src={contact}></img>
                    </div>
                </Col>

                <Col md={6}>
                    <div className={cx('title')}>
                        <h2>
                            Liên hệ với các admin nếu có bất kì thắc mắc trong công tác tình nguyện qua cái email dưới
                            đây:
                        </h2>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>
                                    Bùi Tuấn Kiệt
                                    <span className={cx('hight-light')}>(kietb2014754@student.ctu.edu.vn)</span>, Khoa
                                    CNTT
                                </span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>
                                    Bùi Tuấn Kiệt
                                    <span className={cx('hight-light')}>(kietb2014754@student.ctu.edu.vn)</span>, Khoa
                                    CNTT
                                </span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>
                                    Bùi Tuấn Kiệt
                                    <span className={cx('hight-light')}>(kietb2014754@student.ctu.edu.vn)</span>, Khoa
                                    CNTT
                                </span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>
                                    Bùi Tuấn Kiệt
                                    <span className={cx('hight-light')}>(kietb2014754@student.ctu.edu.vn)</span>, Khoa
                                    CNTT
                                </span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>
                                    Bùi Tuấn Kiệt
                                    <span className={cx('hight-light')}>(kietb2014754@student.ctu.edu.vn)</span>, Khoa
                                    CNTT
                                </span>
                            </li>
                        </ul>
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default ContactUserSLide;
