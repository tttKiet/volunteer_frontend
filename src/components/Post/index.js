import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import moment from 'moment';

import { useEffect, useState, useRef } from 'react';
import MorePost from '../MorePost';

import img1 from '../../assets/images/bg-post-1.jpg';
import img2 from '../../assets/images/bg-post-2.jpg';
import img3 from '../../assets/images/bg-post-3.jpg';
import img4 from '../../assets/images/bg-post-4.jpg';
import img5 from '../../assets/images/bg-post-5.jpg';
import avt from '../../assets/images/avt1.png';

const obImgS = {
    img1,
    img2,
    img3,
    img4,
    img5,
};

const cx = classNames.bind(styles);
function Post({
    author,
    title,
    content,
    upDate,
    light = true,
    image,
    admin = false,
    handleDeletePost,
    postId,
    handleEdit,
}) {
    const postRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const isDevImg = image?.startsWith('img');
    const [viewMore, setViewMore] = useState(false);
    const [desc, setDesc] = useState(() => {
        if (content.length > 100) {
            setViewMore(true);
            return content.slice(0, 100);
        } else {
            return content;
        }
    });

    const setContent = () => {
        return !viewMore ? content.slice(0, 100) : content;
    };

    const handleClickMore = () => {
        setDesc(setContent());
        setViewMore((viewMore) => !viewMore);
    };

    useEffect(() => {
        setDesc(() => {
            if (content.length > 100) {
                setViewMore(true);
                return content.slice(0, 100);
            } else {
                return content;
            }
        });
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

        if (postRef.current) {
            observer.observe(postRef.current);
        }

        return () => {
            if (postRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(postRef.current);
            }
        };
    }, [content]);

    return (
        <div
            className={cx('wrap', {
                isVisible: isVisible,
            })}
            ref={postRef}
        >
            <div
                className={cx('header', {
                    'header-light': light,
                })}
            >
                {/* // eslint-disable-next-line jsx-a11y/alt-text */}
                <img className={cx('user')} src={avt}></img>
                <b>_{author}</b>
                <span className={cx('dot')}> • </span>
                <span className={cx('time')}>{moment(upDate).startOf().fromNow()}</span>
                {admin && <MorePost id={postId} handleDeletePost={handleDeletePost} handleEdit={handleEdit} />}
            </div>
            <div
                className={cx('main', {
                    'img-dev': isDevImg,
                })}
                style={{ backgroundImage: `url(${obImgS[image]})` }}
            >
                {!isDevImg && <img className={cx('image-up')} src={image} alt="ANH" />}

                {isDevImg && (
                    <div className={cx('footer', { 'footer-light': light, 'into-Img': isDevImg })}>
                        <div>
                            <h2 className={cx('title')}>{title}</h2>

                            <pre className={cx('desc')}>
                                {desc}
                                {viewMore ? (
                                    <pre>
                                        <span> ... </span>
                                        <pre className={cx('more')} onClick={handleClickMore}>
                                            [xem thêm]
                                        </pre>
                                    </pre>
                                ) : (
                                    <pre className={cx('more')} onClick={handleClickMore}>
                                        {desc.length > 100 ? '[ẩn]' : ''}
                                    </pre>
                                )}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
            {!isDevImg && (
                <div className={cx('footer', { 'footer-light': light })}>
                    <div>
                        <h2 className={cx('title')}>{title}</h2>

                        <pre className={cx('desc')}>
                            {desc}
                            {viewMore ? (
                                <pre>
                                    <span> ... </span>
                                    <pre className={cx('more')} onClick={handleClickMore}>
                                        [xem thêm]
                                    </pre>
                                </pre>
                            ) : (
                                <pre>
                                    <pre className={cx('more')} onClick={handleClickMore}>
                                        {desc.length > 100 ? '[ẩn]' : ''}
                                    </pre>
                                </pre>
                            )}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
