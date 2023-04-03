import { useEffect, useState } from 'react';

import TableWork from '../TableWork';
import classNames from 'classnames/bind';
import styles from './ListUserWork.module.scss';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import { workServices } from '~/services';
import Moment from 'react-moment';
import ExportToEx from '../ExportToEx';
import moment from 'moment';
const cx = classNames.bind(styles);

function ListUserWork({ show, workId, toggleShowTable }) {
    const [row, setRow] = useState([]);
    const [exData, setExData] = useState([]);

    // Tao table

    let columns = [
        { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
        { Header: 'MSSV', accessor: 'col2', filter: 'fuzzyText' },
        { Header: 'Tên', accessor: 'col3', filter: 'fuzzyText' },
        { Header: 'Email', accessor: 'col4', filter: 'fuzzyText' },
        { Header: 'Lớp', accessor: 'col5', filter: 'fuzzyText' },
        { Header: 'Ngày đăng ký', accessor: 'col6', filter: 'fuzzyText' },
    ];

    const convertToDataRow = (rows) => {
        const dataRow = rows.map((row, index) => {
            return {
                col1: index + 1,
                col2: row.userWork.id,
                col3: row.userWork.name,
                col4: row.userWork.email,
                col5: row.userWork.className,
                col6: moment(row.createdAt).format('LL'),
            };
        });
        return dataRow;
    };

    useEffect(() => {
        const getBrowsedUser = async () => {
            const res = await workServices.getBrowsedUser({ workId });

            if (res.errCode === 0) {
                const data = convertToDataRow(res.works);
                setRow(data);
                setExData(res.works);
            }
        };
        getBrowsedUser();
    }, [workId]);

    return (
        <div
            className={cx('wrap', {
                show: show,
            })}
        >
            <div title="Quay lại" className={cx('icon-back')} onClick={toggleShowTable}>
                <UilAngleDoubleLeft size={28} />
            </div>
            <div className={cx('wrap-table')}>
                <h2 className={cx('title')}>{exData[0]?.work.name}</h2>
                <div className={cx('control')}>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Ngày bắt đầu:</span>
                        <span className={cx('more-number')}>
                            <Moment local="vi" format="ll">
                                {exData[0]?.work.startDate}
                            </Moment>
                        </span>
                    </div>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Nơi làm việc:</span>
                        <span className={cx('more-number')}>{exData[0]?.work?.workPlace}</span>
                    </div>
                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Tối đa: </span>
                        <span className={cx('more-number')}>{exData[0]?.work.maxStudent}</span>
                    </div>

                    <div className={cx('wrap-more')}>
                        <span className={cx('more-content')}>Đã duyệt: </span>
                        <span className={cx('more-number')}>{exData[0]?.work.curStudent}</span>
                    </div>

                    <div className={cx('wrap-more')}>
                        <ExportToEx data={exData} />
                    </div>
                </div>

                <div className={cx('table')}>
                    <TableWork columns={columns} data={row} />
                </div>
            </div>
        </div>
    );
}

export default ListUserWork;
