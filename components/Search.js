import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Grid, Button, FormControl, OutlinedInput, InputAdornment, Typography, Card } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';

const Search = () => {
    const router = useRouter()
    const { products } = useSelector(state => state.products)
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        handleSearch()
    }, [searchTerm])

    const handleSearch = () => {
        let data
        if (searchTerm === "") {
            return setResults([])
        } else {
            data = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }
        if (data.length > 5) {
            data = data.splice(0, 5)
        }
        setResults(data)
    }

    const handleClick = id => {
        setResults([])
        router.push(`/products/${id}`)
    }

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <Grid item xs={9}>
                <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-search2"
                        placeholder={"Search Product"}
                        size="small"
                        value={searchTerm || ""}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                    />
                </FormControl>
            </Grid>
            {/* SEARCH BUTTON */}
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    sx={{ color: '#fff' }}
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Grid>
            {results && results.length > 0 &&
                <Card
                    sx={{
                        mt: 7,
                        py: 2,
                        px: 2,
                        position: 'absolute',
                        zIndex: 200,
                    }}
                >
                    {
                        results.map(result => (
                            <Typography
                                key={result.id}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleClick(result.id)}
                            >
                                {result.title}
                            </Typography>
                        ))
                    }

                </Card>
            }
        </>
    )
}

export default Search