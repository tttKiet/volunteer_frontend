import { useMemo } from 'react';
import { matchSorter } from 'match-sorter';
import GlobalFilter from '../GlobalFilter';
import DefaultColumnFilter from '../DefaultColumnFilter';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
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
            // "startWith"
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
        state,
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
    );
    const firstPageRows = rows.slice(0, 10);
    return (
        <div className={cx('wrap')}>
            <div className={cx('header__table')}>
                <div className={cx('header__table--entries')}>Showing the first 20 results of {rows.length} rows</div>
                <div className={cx('header__table--search')}>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
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
                                    {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                                    <span>
                                        {console.log('column: ', column)}
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
                    {firstPageRows.map((row, i) => {
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
            <div></div>
        </div>
    );
}

export default TableWork;
