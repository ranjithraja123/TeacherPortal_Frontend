import * as React from 'react';
import { Box, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios';
import NavBar from '../Navbar/NavBar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
         fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const DataTable = () => {
    const { authUser } = useAuthContext();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [editingId, setEditingId] = React.useState(null);
    const [editData, setEditData] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [newStudent, setNewStudent] = React.useState({
        name: '',
        subject: '',
        mark: ''
    });
    const [errors, setErrors] = React.useState({
        name: '',
        subject: '',
        mark: ''
    });

    React.useEffect(() => {
        const fetchData = async () => {
            if (!authUser) return;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get('/api/students/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response?.data || []);
            } catch (error) {
                setError('Failed to fetch data.');
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [authUser]);

    const handleEdit = (id) => {
        setEditingId(id);
        const row = data.find((row) => row._id === id);
        setEditData({ ...row });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            await axios.put(`/api/students/${editData._id}`, editData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData((prevData) =>
                prevData.map((item) =>
                    item._id === editData._id ? { ...editData } : item
                )
            );
            setEditingId(null);
        } catch (error) {
            console.error('Failed to update data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            await axios.delete(`/api/students/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData((prevData) => prevData.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Failed to delete data:', error);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));

        // Validation logic
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value.trim() === '' ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : ''
        }));
        if (name === 'mark') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                mark: value.trim() === '' || isNaN(value) || value > 100 ? 'Valid mark up to 100 is required' : ''
            }));
        }
    };

    const isFormValid = () => {
        return (
            newStudent.name.trim() !== '' &&
            newStudent.subject.trim() !== '' &&
            newStudent.mark.trim() !== '' &&
            !isNaN(newStudent.mark) &&
            newStudent.mark <= 100
        );
    };

    const handleAddSave = async () => {
        if (!isFormValid()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            await axios.post('/api/students/', newStudent, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData((prevData) => [...prevData, newStudent]);
            setNewStudent({ name: '', subject: '', mark: '' });
            handleClose();
            window.location.reload()
        } catch (error) {
            console.error('Failed to add data:', error);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <p>{error}</p>;

    return (
        <>
            <NavBar />
            <div style={{ padding: '25px' }}>
                <IconButton
                    style={{ position: 'absolute', top: 90, right: 16 }}
                    color="dark"
                    onClick={handleOpen}
                >
                    <AddBoxIcon fontSize="large" />
                </IconButton>
                <TableContainer component={Paper} style={{ marginTop: '70px' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Student Name</StyledTableCell>
                                <StyledTableCell align="right">Subject</StyledTableCell>
                                <StyledTableCell align="right">Mark</StyledTableCell>
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {editingId === row._id ? (
                                            <TextField
                                                name="name"
                                                value={editData.name || ''}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        ) : (
                                            <Box display="flex" alignItems="center">
                                                <img
                                                    src={`https://avatar.iran.liara.run/username?username=${row.name}`}
                                                    alt={row.name}
                                                    style={{ width: 34, height: 34, borderRadius: '50%', marginRight: 8 }}
                                                />
                                                {row.name}
                                            </Box>
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {editingId === row._id ? (
                                            <TextField
                                                name="subject"
                                                value={editData.subject || ''}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        ) : (
                                            row.subject
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {editingId === row._id ? (
                                            <TextField
                                                name="mark"
                                                value={editData.mark || ''}
                                                onChange={handleChange}
                                                size="small"
                                                type="number"
                                                inputProps={{ max: 100 }}
                                            />
                                        ) : (
                                            row.mark
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {editingId === row._id ? (
                                            <IconButton onClick={handleSave} color="primary">
                                                Save
                                            </IconButton>
                                        ) : (
                                            <>
                                                <IconButton onClick={() => handleEdit(row._id)} color="dark">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(row._id)} color="dark">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Student Name"
                        type="text"
                        fullWidth
                        value={newStudent.name}
                        onChange={handleAddChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        margin="dense"
                        name="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        value={newStudent.subject}
                        onChange={handleAddChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                    />
                    <TextField
                        margin="dense"
                        name="mark"
                        label="Mark"
                        type="number"
                        fullWidth
                        value={newStudent.mark}
                        onChange={handleAddChange}
                        error={!!errors.mark}
                        helperText={errors.mark}
                        inputProps={{ max: 100 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddSave} color="primary" disabled={!isFormValid()}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DataTable;
