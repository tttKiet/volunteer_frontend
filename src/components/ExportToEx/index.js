import { Button } from 'react-bootstrap';
import moment from 'moment';
import * as XLSX from 'xlsx/xlsx.mjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';

import styles from './ExportToEx.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ExportToEx({ data }) {
    const convertData = (data) => {
        return data.map((data, index) => {
            return {
                STT: index + 1,
                MSSV: data.userWork.id,
                'Họ và tên': data.userWork.name,
                Email: data.userWork.email,
                Lớp: data.userWork.className,
                'Ngày đăng ký': moment(data.createdAt).format('MMM Do YY'),
            };
        });
    };

    const handleClickExportFile = () => {
        if (!data) return;
        const dataConvert = convertData(data);

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataConvert, { origin: 'B6' });

        const mergeCellStyle = {
            alignment: { horizontal: 'center', vertical: 'center' },
            font: { bold: true },
        };

        XLSX.utils.aoa_to_sheet([
            ['', 'Cell B4', 'Cell C4', 'Cell D4', 'Cell E4', 'Cell F4', 'Cell G4'],
            ['', '', '', '', '', '', ''],
        ]);
        worksheet['!merges'] = [{ s: { r: 3, c: 1 }, e: { r: 3, c: 6 } }];
        worksheet['!cols'] = [{ autoWidth: true }];

        // worksheet['B4'].v = { s: mergeCellStyle, v: 'Danh sách tham gia tình nguyện' };

        worksheet['B4'] = { t: 's', v: `Danh sách tham gia ${data[0].work.name}` };
        worksheet['B4'].s = mergeCellStyle;

        const startColIndex = 1; // cột B
        const endColIndex = 10; // cột K

        // Thay đổi chiều rộng cho từng cột trong khoảng B-K
        for (let colIndex = startColIndex; colIndex <= endColIndex; colIndex++) {
            if (!worksheet['!cols']) {
                worksheet['!cols'] = [];
            }

            if (!worksheet['!cols'][colIndex] && [7, 8].indexOf(colIndex) === -1) {
                worksheet['!cols'][colIndex] = {};
            }
        }
        worksheet['!cols'][1] = { width: 6 };
        worksheet['!cols'][2] = { width: 8 };
        worksheet['!cols'][3] = { width: 26 };
        worksheet['!cols'][4] = { width: 34 };
        worksheet['!cols'][5] = { width: 14 };
        worksheet['!cols'][6] = { width: 14 };
        worksheet['!cols'][9] = { width: 14 };
        worksheet['!cols'][10] = { width: 30 };

        XLSX.utils.sheet_add_aoa(
            worksheet,
            [
                ['Ngày bắt đầu', moment(data[0].work.startDate).format('MMM Do YY')],
                ['Nơi làm việc', data[0].work.workPlace],
                ['Tối đa', data[0].work.maxStudent],
                ['Số SV hiện tại', data[0].work.curStudent],
            ],
            { origin: 'J6' },
        );

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách tham gia tình nguyện');
        XLSX.writeFile(workbook, 'volunter.xlsx');
    };

    return (
        <Button variant="outline-success" className={cx('btn-export')} onClick={handleClickExportFile}>
            Xuất ra file
            <FontAwesomeIcon icon={faFileExcel} />
        </Button>
    );
}

export default ExportToEx;
