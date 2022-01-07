import React, { useState } from "react";
import ProductData from "../../../product.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  boxShadow: 24,
  p: 4,
};
const Product = () => {
  const [list, setList] = useState(ProductData);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchItem, setSearchItem] = useState("");

  const handleOpen = (selectedValue) => {
    setOpen(true);
    setSelectedItem(true);
    setSelectedId(selectedValue.id);
    setName(selectedValue.name);
    setPrice(selectedValue.price);
    setCategory(selectedValue.category);
  };

  const handleClose = () => setOpen(false);

  const deleteHandler = (deleteItemId) =>
    setList(list.filter((element) => element.id !== deleteItemId));

  const submitHandle = (e) => {
    e.preventDefault();
    if (name && price && category) {
      if (selectedItem) {
        setSelectedItem(false);
        const prevList = [...list];
        const updatedList = prevList.map((item) => {
          if (item.id === selectedId) {
            return {
              ...item,
              name,
              price,
              category,
            };
          }
          return item;
        });
        setList(updatedList);
      } else {
        console.log("added");
      }
    }
    setOpen(false);
  };

  const searchHandler = () => {
    const list_ = list.filter(({ name }) => name.includes(searchItem));
    console.log("list", list_);
    setList(list_);
  };

  return (
    <div>
      <Box sx={{ m: "20px" }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "90%",
            mx: "auto",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Product"
            inputProps={{ "aria-label": "Search Product" }}
            value={searchItem}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
          <IconButton
            onClick={searchHandler}
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Table sx={{ width: "85%", mx: "auto" }}>
        <TableHead>
          <TableRow>
            {["Image", "Name", "Price", "Category", "Action"].map(
              (field, index) => (
                <TableCell key={index}>{field}</TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((value, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{value.filename}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.price}</TableCell>
                <TableCell>{value.category}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpen(value)}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteHandler(value.id)}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <form autoComplete="off" onSubmit={submitHandle}>
              <TextField
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                label="Name"
                variant="outlined"
                sx={{ mt: 5 }}
                fullWidth
                required
              />
              <br />
              <TextField
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                value={price}
                label="Price"
                variant="outlined"
                sx={{ mt: 5 }}
                fullWidth
                required
              />
              <br />
              <TextField
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                value={category}
                label="category"
                variant="outlined"
                sx={{ mt: 5 }}
                fullWidth
                required
              />
              <br />
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Product;
