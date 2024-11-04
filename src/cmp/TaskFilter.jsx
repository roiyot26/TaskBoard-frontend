import { useDispatch, useSelector } from 'react-redux'
import { useState, useCallback } from 'react'
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button } from '@mui/material'
import { setFilter } from '../store/actions/app.action'
import { utilService } from '../services/util.service'
import { useTranslation } from 'react-i18next'

export function TaskFilter() {
  const dispatch = useDispatch()
  const filterBy = useSelector((state) => state.appModule.filterBy)
  const { t } = useTranslation()
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
    <div className='task-filter'>
      <TextField
        label={t("filterByTitle")}
        value={localTitle}
        onChange={handleTitleChange}
        variant="outlined"
        size="small"
      />

      <FormControl variant="outlined" size="small">
        <InputLabel>{t("priority")}</InputLabel>
        <Select
          value={filterBy.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          label="Priority"
        >
          <MenuItem value="">{t("all")}</MenuItem>
          <MenuItem value="low">{t("low")}</MenuItem>
          <MenuItem value="medium">{t("medium")}</MenuItem>
          <MenuItem value="high">{t("high")}</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small">
        <InputLabel>{t("taskPerPage")}</InputLabel>
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

      <FormControl variant="outlined" size="small">
        <InputLabel>{t("sortBy")}</InputLabel>
        <Select
          value={filterBy.sortBy || 'title'}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          label="Sort by"
        >
          <MenuItem value="title">{t("title")}</MenuItem>
          <MenuItem value="createdAt">{t("createdAt")}</MenuItem>
          <MenuItem value="priority">{t("priority")}</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={filterBy.isAscending}
            onChange={(e) => handleChange('isAscending', e.target.checked)}
          />
        }
        label={t("ascending")}
      />

      <Button variant="outlined" onClick={handleClearFilters}>
        {t("clearFilters")}
      </Button>
    </div>
  );
}
