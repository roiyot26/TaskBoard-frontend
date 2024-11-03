import { useDispatch, useSelector } from 'react-redux'
import { useState, useCallback } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button } from '@mui/material'
import { setFilter } from '../store/actions/app.action'
import { utilService } from '../services/util.service'

export function TaskFilter() {
  const dispatch = useDispatch()
  const filterBy = useSelector((state) => state.appModule.filterBy)

  const [localTitle, setLocalTitle] = useState(filterBy.title || '')

  const debouncedSetFilter = useCallback(
    utilService.debounce((newTitle) => {
      dispatch(setFilter({ ...filterBy, title: newTitle }))
    }, 700), 
    [dispatch, filterBy]
  )

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setLocalTitle(newTitle)
    debouncedSetFilter(newTitle)
  }

  const handleChange = (key, value) => {
    dispatch(setFilter({ ...filterBy, [key]: value }))
  }

  const handleClearFilters = () => {
    dispatch(setFilter({ title: '', priority: '', sortBy: 'title', isAscending: true, page: 1, limit: 5 }))
    setLocalTitle('')
  };

  return (
    <div>
      <TextField
        label="Filter by Title"
        value={localTitle}
        onChange={handleTitleChange}
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

      <FormControl variant="outlined" size="small">
        <InputLabel>Tasks per Page</InputLabel>
        <Select
          value={filterBy.limit || 5}
          onChange={(e) => handleChange('limit', e.target.value)}
          label="Tasks per Page"
        >
          {[...Array(10)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="outlined" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}
