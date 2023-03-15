/* eslint-disable react/jsx-key */
import { Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa"
import { useSortBy, useTable } from "react-table"

interface Props {
    data: any[]
    columns: any[]
}

export default function DataTable({
    data,
    columns,
}: Props) {

    const tableInstance = useTable({ columns, data }, useSortBy)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <Table fontFamily="athiti" {...getTableProps()}>
            <Thead>
                {
                    headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column: any) => (
                                    <Th p={[1, 5]} fontSize={["xs", "md", "xl"]} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? (<><Icon as={FaSortDown} /></>)
                                                    : (<><Icon as={FaSortUp} /></>)
                                                : <><Icon color="gray.300" as={FaSort} /></>
                                            }
                                        </span>

                                    </Th>
                                ))
                            }
                        </Tr>
                    ))

                }
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <Tr fontSize={["sm", "lg"]} {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => (
                                        <Td px={[1, 5]} {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </Td>
                                    ))
                                }
                            </Tr>
                        )
                    })
                }
            </Tbody>
        </Table>
    )
}