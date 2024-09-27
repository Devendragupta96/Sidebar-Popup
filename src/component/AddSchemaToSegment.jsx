import React, { useState } from "react";
import { Box, MenuItem, Select, InputLabel, FormControl, Input, Button } from "@mui/material";
import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "../css/AddSchemaToSegment.css";
import "../css/SaveSegment.css";

const schemaOptions = [
  { label: "First Name", value: "first_name", traits: 'user' },
  { label: "Last Name", value: "last_name", traits: 'user' },
  { label: "Gender", value: "gender", traits: 'group' },
  { label: "Age", value: "age", traits: 'user' },
  { label: "Account Name", value: "account_name", traits: 'group' },
  { label: "City", value: "city", traits: 'group' },
  { label: "State", value: "state", traits: 'group' },
];

const AddSchemaToSegment = ({ onClose }) => {
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSelection, setCurrentSelection] = useState("");
  const [inputSegment, setInputSegment] = useState('');

  const handleSchemaChange = (e) => {
    setCurrentSelection(e.target.value);
  };

  const handleAddSchema = () => {
    if (currentSelection && !selectedSchemas.includes(currentSelection)) {
      setSelectedSchemas((prev) => [...prev, currentSelection]);
      setAvailableSchemas((prev) =>
        prev.filter((schema) => schema.value !== currentSelection)
      );
      setCurrentSelection("");
    }
  };

  const handleInputChange = (e) => {
    setInputSegment(e.target.value);
  };

  const handleSelectedSchemaChange = (index, event) => {
    const newValue = event.target.value;
    const updatedSchemas = [...selectedSchemas];
    const previousValue = updatedSchemas[index];

    if (!selectedSchemas.includes(newValue)) {
      updatedSchemas[index] = newValue;
      setSelectedSchemas(updatedSchemas);

      setAvailableSchemas((prev) =>
        prev
          .filter((schema) => schema.value !== newValue)
          .concat(schemaOptions.find((schema) => schema.value === previousValue))
      );
    }
  };

  const onSubmit=async()=>{
    if (!inputSegment) {
      toast.error("Segment name is required!", {
        autoClose: 3000,
      });
      return;
    }
    const data=[]
    schemaOptions.forEach((ele)=>{
      if(selectedSchemas.includes(ele.value)){
        data.push({
          [ele.value]:ele.label
        })
      }
    })
    const payload = {
      segment_name: inputSegment,
      schema: data
    };
    try {
      const response = await fetch('https://webhook.site/1fe1d889-e115-408b-a802-d5cc2dc3db20', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });
      // const responseData = await response.json();
      // console.log('Response from server:', response.status);
      toast.success("Segment saved successfully!", {
        autoClose: 3000,
      });
      setSelectedSchemas([])
    } catch (error) {
      console.error('Error while posting data:', error); 
      toast.error("Error while saving segment.", {
        autoClose: 3000,
      });
    }
    
  }

  const getTraitColor = (traits) => {
    return traits === 'user' ? '#5ddb78' :traits==='group'? '#d24572':'#eeeeee';
  };

  return (
    <div className="popup-container">
      <header className="header">
        <KeyboardArrowLeftTwoToneIcon />
        <p>Saving Segment</p>
      </header>
      <div style={{ padding: "20px",flex: 1, overflowY: 'auto' }}>
        <Box m='10px' width='400px'>
          <p style={{ marginBottom: '30px', color: '#5c5c5c' }}>Enter the name of the Segment</p>
          <Input
            name="inputSegment"
            value={inputSegment}
            onChange={handleInputChange}
            autoFocus={true}
            placeholder="Name of the segment"
            fullWidth
            sx={{
              marginBottom: '30px'
            }}
          />
          <p style={{ marginBottom: '30px', color: '#5c5c5c' }}>To save your segment, you need to add the schemas to build the query</p>
        </Box>
        <div className="legend">
          <div className="icon"></div><span style={{fontSize:'10px'}}>User Traits</span>
          <div className="icon"></div><span style={{fontSize:'10px'}}>Group Traits</span>
        </div>

        <Box>
          {selectedSchemas.map((schema, index) => {
            const selectedSchema = schemaOptions.find(option => option.value === schema);
            return(
            <FormControl key={index} fullWidth margin="normal" sx={{marginTop:'0px'}}>
              <Box display={'flex'} alignItems={'center'}>
              <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: getTraitColor(selectedSchema.traits),
                      borderRadius: '50%',
                      marginRight: '10px'
                    }}
              />
              <InputLabel>Schema</InputLabel>
              <Select
                value={schema}
                onChange={(e) => handleSelectedSchemaChange(index, e)}
                label="Schema"
                sx={{
                  height: "40px",
                  width: "400px",
                  fontSize: "0.85rem",
                  padding: "5px 10px",
                  boxSizing: "content-box",
                }}
              >
                {schemaOptions
                  .filter(
                    (option) =>
                      option.value === schema ||
                      availableSchemas.some((opt) => opt.value === option.value)
                  )
                  .map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
              </Box>
            </FormControl>
            )
        })}
        </Box>

        <FormControl fullWidth sx={{marginLeft:'20px'}}>
          <InputLabel sx={{ fontSize: "0.9rem" }}>
            Add schema to segment
          </InputLabel>
          <Select
            value={currentSelection}
            onChange={handleSchemaChange}
            label="Add schema to segment"
            sx={{
              height: "40px",
              width: "400px",
              fontSize: "0.85rem",
              padding: "5px 10px",
              boxSizing: "content-box",
              marginTop: "0px !important",
            }}
          >
            <MenuItem value="">
              <em>Select schema</em>
            </MenuItem>
            {availableSchemas.map((schema) => (
              <MenuItem key={schema.value} value={schema.value}>
                {schema.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <p className="add_schema" onClick={handleAddSchema}>
          + Add new schema
        </p>
      </div>
      <footer style={{ padding: "20px", display: "flex", gap: "10px", background:'#eeeeee' }}>
      <Button 
          variant="contained" 
          sx={{
            background:'#40b493',
            textTransform: 'none'
          }}
          onClick={onSubmit}
        >
          Save the segment
        </Button>
        <Button variant="outlined" color="error" onClick={onClose} sx={{textTransform: 'none'}}>
          Cancel
        </Button>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default AddSchemaToSegment;
