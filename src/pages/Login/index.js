import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '~/redux/selector';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import FormLogin from '~/components/FormLogin';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const isLoggined = useSelector(isLoginSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggined) {
            navigate('/');
        }
    });

    return (
        <div className={cx('wrap')}>
            <div className={cx('wrapper')}>
                <Col md={8}>
                    <div className={cx('wrap__form')}>
                        <FormLogin />
                    </div>
                </Col>
                <Col md={4}>
                    <div className={cx('description')}>
                        <div className={cx('youtobe')}>
                            <iframe
                                className={cx('video')}
                                // width="560"
                                // height="315"
                                src="https://www.youtube.com/embed/vjhFsPNk6Po?autoplay=1&mute=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className={cx('content')}>
                            <h2>Truyền Cảm Hứng </h2>
                            <p>
                                GenZ được coi như một thế hệ cô đơn nhất lịch sử. Thay vì cứ chìm trong sự cô độc, và
                                nỗi u uất. Đắm mình vào thói quen lướt mạng vô thức. Và thấy thiếu kết nối với những
                                tương tác ảo trên. Hãy bước ra ngoài đi làm tình nguyện để thấy cuộc đời, tình người
                                tuyệt vời thế nào.
                            </p>
                            <a
                                href="https://veo.com.vn/10-loi-ich-tinh-nguyen-day-bat-ngo-truyen-cam-hung-thoi-thuc-ban-di-ngay/"
                                className="btn btn-primary"
                            >
                                Tìm hiểu thêm?
                            </a>
                            <hr />
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default Login;
