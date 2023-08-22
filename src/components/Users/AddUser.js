import React, { useState,useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
import Wrapper from '../Wrapper/Wrapper';

const AddUser = (props) => {
  const enteredUsername = useRef();
  const enteredAge = useRef();
  const enteredCollege = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    let username = enteredUsername.current.value;
    let userage = enteredAge.current.value;
    let usercollege = enteredCollege.current.value;
    if (username.trim().length === 0 || userage.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+userage < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(username, userage, usercollege);
    enteredUsername.current.value = '';
    enteredAge.current.value = '';
    enteredCollege.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={enteredUsername}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={enteredAge}
          />
          <label htmlFor="college">College Name</label>
          <input
            id="college"
            type="text"
            ref={enteredCollege}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;