import { useState, useEffect } from 'react';
import { postServices } from '~/services';
import Post from '../Post';
import bc1 from '../../assets/images/baochi1.webp';
import bc2 from '../../assets/images/baochi2.webp';
import bc3 from '../../assets/images/baochi3.webp';

import classNames from 'classnames/bind';
import styles from './HomeUser.module.scss';

const cx = classNames.bind(styles);

function HomeUser() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const res = await postServices.getPosts({ limit: 10 });
            if (res.errCode === 0) {
                setPost(res.posts);
            }
        };
        getPosts();
    }, []);

    return (
        <div className={cx('wrap')}>
            <div className={cx('social')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-8')}>
                        <div className={cx('wrap-post')}>
                            <div className={cx('post-profice')}>
                                {post.map((post) => {
                                    return (
                                        <Post
                                            image={post.linkImage}
                                            light={true}
                                            key={post.id}
                                            author={post.user.id}
                                            title={post.title}
                                            content={post.description}
                                            upDate={post.createdAt}
                                        />
                                    );
                                })}
                                {post.length === 0 && <div> Chưa có bài POST nào!</div>}
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-md-4')}>
                        <div className={cx('news')}>
                            <h2 className={cx('title')}>MỘT SỐ BÀI BÁO NỔI BẬT</h2>
                            <a
                                href="https://dantri.com.vn/the-gioi/nhung-tinh-nguyen-vien-tim-thi-the-linh-tu-tran-tren-chien-truong-ukraine-20230109100158926.htm"
                                className={cx('new')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={bc1}></img>
                                <h2 className={cx('new-title')}>
                                    Những tình nguyện viên tìm thi thể lính tử trận trên chiến trường Ukraine
                                </h2>
                                <span className={cx('new-desc')}>
                                    Một nhóm tình nguyện viên đã tình nguyện đến các khu vực tiền tuyến ở chiến trường
                                    Ukraine để thực hiện sứ mệnh tìm kiếm, đưa thi thể những người lính tử trận về với
                                    gia đình.
                                    <span> Xem thêm</span>
                                </span>
                            </a>
                            <a
                                href="https://dantri.com.vn/the-gioi/dai-su-my-chao-mung-nhom-tinh-nguyen-vien-dau-tien-cua-chuong-trinh-hoa-binh-toi-viet-nam-20221102223732515.htm"
                                className={cx('new')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={bc2}></img>
                                <h2 className={cx('new-title')}>
                                    Đại sứ Mỹ chào mừng nhóm tình nguyện viên đầu tiên của Chương trình Hòa bình tới
                                    Việt Nam.
                                </h2>
                                <span className={cx('new-desc')}>
                                    Đại sứ Mỹ tại Việt Nam Marc Knapper đã chào mừng nhóm 10 tình nguyện viên đầu tiên
                                    của Chương trình Hòa bình tới Việt Nam sau thỏa thuận hợp tác giữa hai nước.
                                    <span> Xem thêm</span>
                                </span>
                            </a>
                            <a
                                href="https://dantri.com.vn/the-gioi/nhung-tinh-nguyen-vien-trong-tam-dich-indonesia-20210723211858464.htm"
                                className={cx('new')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={bc3}></img>
                                <h2 className={cx('new-title')}>Những tình nguyện viên trong tâm dịch Indonesia</h2>
                                <span className={cx('new-desc')}>
                                    Bất chấp mối nguy hiểm rình rập, các tình nguyện viên Indonesia vẫn lao vào tâm dịch
                                    giúp đỡ hàng ngàn người dân vật lộn trong cơn sóng thần Covid-19.
                                    <span> Xem thêm</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeUser;
