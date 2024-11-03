import { useDispatch, useSelector } from 'react-redux';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button } from '@mui/material';
import { setFilter } from '../store/actions/app.action';

export function TaskFilter() {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.appModule.filterBy);

  const handleChange = (key, value) => {
    dispatch(setFilter({ ...filterBy, [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(setFilter({ title: '', priority: '', sortBy: 'title', isAscending: true, page: 1, limit: 5 }));
  };

  return (
    <div>
      <TextField
        label="Filter by Title"
        value={filterBy.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
        variant="outlined"
        size="small"
      />

      <FormControl variant="outlined" size="small">
        <InputLabel>Priority</InputLabel>
        <Select
          value={filterBy.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          label="Priority"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small">
        <InputLabel>Sort by</InputLabel>
        <Select
          value={filterBy.sortBy || 'title'}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          label="Sort by"
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="createdAt">Creation Date</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={filterBy.isAscending}
            onChange={(e) => handleChange('isAscending', e.target.checked)}
          />
        }
        label="Ascending"
      />

      {/* Tasks per page selection */}
      <FormControl variant="outlined" size="small">
        <InputLabel>Tasks per Page</InputLabel>
        <Select
          value={filterBy.limit || 5}
          onChange={(e) => handleChange('limit', e.target.value)}
          label="Tasks per Page"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}
