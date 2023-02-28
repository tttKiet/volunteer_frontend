import { useEffect, useState } from 'react';
import { workServices } from '~/services';
import WorkInList from '~/components/WorkInList';
import classNames from 'classnames/bind';
import styles from './ListWork.module.scss';
import { Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

function ListWork() {
    const [work, setWork] = useState([]);

    useEffect(() => {
        const getWorks = async () => {
            const res = await workServices.getNameWork({});
            if (res.errCode === 0) {
                setWork(res.workNames);
            }
        };
        getWorks();
    }, []);
    return (
        <div className={cx('wrap')}>
            <div>
                <h1 className={cx('title')}> Danh sách tổ chức các công việc cho tình nguyện viên sắp tới</h1>
            </div>

            <div className={cx('main')}>
                <Row className={cx('g-5', 'work-lists')}>
                    {work.map((work, index) => (
                        <WorkInList
                            key={work.id}
                            stt={index + 1}
                            name={work.name}
                            startDate={work.startDate}
                            place={work.workPlace}
                            maxStudent={work.maxStudent}
                            curStudent={work.curStudent}
                            pointPlus={work.pointPlus}
                        />
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default ListWork;
