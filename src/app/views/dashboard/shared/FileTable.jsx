import {
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Paragraph } from 'components/Typography';
import { Test } from './Test';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));


const FileTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  new Test();

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>top selling products</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                File
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Last Modified
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Version Number
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {fileList.map((file, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{file.name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {file.lastModified}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {file.version}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {file.status == "local"? (
                    <Small bgcolor={bgError}>{file.status}</Small>
                  ):(
                    file.status == "submitting" ? (
                      <Small bgcolor={bgSecondary}>{file.status}</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>{file.status}</Small>
                    )
                  ) }
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const fileList = [
  {
    name: 'file 1',
    version: 1,
    lastModified: '12/12/2020',
    status: 'local',
  },
  {
    name: 'file 2',
    version: 2,
    lastModified: '12/12/2020',
    status: 'on chain',
  },
  {
    name: 'file 3',
    version: 3,
    lastModified: '1/10/2020',
    status: 'submitting',
  },
];


export default FileTable;
