import { TableRow, TableCell, Button } from '@mui/material';
import { Recipe } from '../shared/types/Recipe';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

type Props = {
  recipe: Recipe;
  onDelete: (id: number) => void;
};

const ListItem: React.FC<Props> = ({
  recipe: { id, title, private: privateRecipe },
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <TableRow
      key={id}
      sx={{
        '&:nth-of-type(odd)': {
          backgroundColor: 'rgba(0, 0, 0, 0.115)',
        },
      }}
    >
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>
        {title}
        {privateRecipe === 1 && <LockIcon sx={{ color: 'gray' }} />}
      </TableCell>
      <TableCell>
        <Button
          component="label"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(id)}
        >
          delete
        </Button>
      </TableCell>
      <TableCell>
        <Button
          component="label"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/list/edit/${id}`)}
          color="secondary"
        >
          edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
