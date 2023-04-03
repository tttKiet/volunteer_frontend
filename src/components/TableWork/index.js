import { useMemo } from 'react';
import { matchSorter } from 'match-sorter';
import GlobalFilter from '../GlobalFilter';
import DefaultColumnFilter from '../DefaultColumnFilter';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

// scss
import classNames from 'classnames/bind';
import stype from './TableWork.module.scss';

const cx = classNames.bind(stype);

function TableWork({ columns, data }) {
    function fuzzyTextFilterFn(rows, id, filterValue) {
        return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
    }

    // Let the table remove the filter if the string is empty
    fuzzyTextFilterFn.autoRemove = (val) => !val;
    const filterTypes = useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        [],
    );

    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        // state,
        pageOptions,
        page,
        state: { pageIndex, pageSize, globalFilter },
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            filterTypes,
            defaultColumn,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );
    return (
        <div className={cx('wrap')}>
            <div className={cx('header__table')}>
                <div className={cx('header__table--entries')}>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Hiển thị {pageSize}
                            </option>
                        ))}
                    </select>
                    Hiển thị {pageSize} / {rows.length} kết quả
                </div>
                <div className={cx('header__table--search')}>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </div>
            </div>
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                '  🔽'
                                            ) : (
                                                '  🔼'
                                            )
                                        ) : column.disableSortBy ? (
                                            ' '
                                        ) : (
                                            <FontAwesomeIcon icon={faSort} className={cx('icon-sort')} />
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            <div className={cx('table-footer')}>
                <div className={cx('table-page-number')}>
                    Trang
                    <em>
                        {pageIndex + 1} / {pageOptions.length}
                    </em>
                </div>
                <div className={cx('table-control')}>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Trang trước
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        Trang tiếp theo
                    </button>
                </div>
            </div>

            {/* footer */}
            <div className={cx('footer__end')}>
                <hr />
                ---Hết---
            </div>
        </div>
    );
}

export default TableWork;
