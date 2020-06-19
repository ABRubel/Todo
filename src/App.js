import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
   button: {
      margin: theme.spacing(1),
   },
}));

const Todo = ({ todo, index, completeCourse, removeCourse, classes }) => (
   <div style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
      {todo.course}
      <Button
         variant="contained"
         color="primary"
         className={classes.button}
         onClick={() => completeCourse(index)}
      >
         Complete
      </Button>
      <Button
         variant="contained"
         color="secondary"
         className={classes.button}
         startIcon={<DeleteIcon />}
         onClick={() => removeCourse(index)}
      >
         Remove
      </Button>
   </div>
);
function TodoForm({ addCourse, classes }) {
   const [value, setValue] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      addCourse(value);
      setValue("");
   };

   return (
      <form onSubmit={handleSubmit}>
         <TextField
            placeholder="Enter Course Title"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="outlined"
         />
         <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            type="submit"
         >
            Submit
         </Button>
      </form>
   );
}
function App() {
   const [todos, setTodos] = useState([
      { course: "Reactjs", isCompleted: false },
      { course: "Nodejs", isCompleted: true },
      { course: "Asp Dot NEt Core", isCompleted: false },
   ]);
   const addCourse = (course) => {
      const newCoures = [...todos, { course }];
      setTodos(newCoures);
   };
   const completeCourse = (index) => {
      const newCoures = [...todos];
      newCoures[index].isCompleted = true;
      setTodos(newCoures);
   };
   const removeCourse = (index) => {
      const newCoures = [...todos];
      newCoures.splice(index, 1);
      setTodos(newCoures);
   };
   const classes = useStyles();

   return (
      <div style={{ textAlign: "center" }}>
         <h1>My TODO App</h1>
         {todos.map((todo, index) => (
            <Todo
               key={index}
               index={index}
               todo={todo}
               completeCourse={completeCourse}
               removeCourse={removeCourse}
               classes={classes}
            />
         ))}
         <TodoForm addCourse={addCourse} classes={classes} />
      </div>
   );
}

export default App;
