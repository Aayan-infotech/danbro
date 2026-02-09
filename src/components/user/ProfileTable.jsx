import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const tableContainerSx = {
  borderRadius: 2,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  border: "1px solid #eee",
  overflow: "auto",
};

const headerRowSx = {
  backgroundColor: "#FFF8F2",
};

const headerCellSx = {
  fontWeight: 700,
  color: "var(--themeColor)",
  fontSize: { xs: 13, md: 14 },
};

const bodyRowSx = {
  "&:hover": { backgroundColor: "rgba(255, 181, 161, 0.06)" },
  "&:last-child td, &:last-child th": { border: 0 },
};

const bodyCellSx = {
  fontSize: { xs: 12, md: 13 },
  color: "#333",
};

/**
 * Common profile table – same look for Recent Items, Order History, Saved Addresses, Wishlist.
 * @param {Object} props
 * @param {Array<{ id: string, label: string, align?: 'left'|'right'|'center', width?: string|number, render: (row: any) => React.ReactNode }>} props.columns
 * @param {any[]} props.data
 * @param {(row: any) => string|number} props.getRowKey
 * @param {object} [props.containerSx] – extra TableContainer sx
 * @param {object} [props.tableSx] – extra Table sx (e.g. minWidth)
 * @param {object|((row: any) => object)} [props.rowSx] – sx for each TableRow (or function per row)
 */
export const ProfileTable = ({
  columns,
  data,
  getRowKey,
  containerSx = {},
  tableSx = {},
  rowSx = {},
}) => {
  const getRowSx = (row) => {
    const base = bodyRowSx;
    const extra = typeof rowSx === "function" ? rowSx(row) : rowSx;
    return { ...base, ...extra };
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ ...tableContainerSx, ...containerSx }}
    >
      <Table size="small" sx={{ minWidth: 650, ...tableSx }}>
        <TableHead>
          <TableRow sx={headerRowSx}>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.align || "left"}
                sx={{
                  ...headerCellSx,
                  ...(col.width ? { width: col.width } : {}),
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={getRowKey(row)} sx={getRowSx(row)}>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align || "left"}
                  sx={bodyCellSx}
                >
                  {col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
