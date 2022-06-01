import { Typography, Grid, Paper, Button, TextField, Box } from '@mui/material';

export default function ProductFilter({
  handleFilter,
  handleResetFilter,
  setMin,
  setMax,
  min,
  max,
}) {
  return (
    <Paper style={{ padding: '5%' }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="body2">Price (₦)</Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleFilter(min, max)}
            disabled={!min && !max}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item xs={5}>
          <TextField
            placeholder="Min"
            size="small"
            type="number"
            value={min || ''}
            onChange={(e) => setMin(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Typography variant="body1">-</Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            placeholder="Max"
            size="small"
            type="number"
            value={max || ''}
            onChange={(e) => setMax(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 1, textAlign: 'right' }}>
        <Button onClick={() => handleResetFilter()} disabled={!min && !max}>
          Reset
        </Button>
      </Box>
    </Paper>
  );
}
