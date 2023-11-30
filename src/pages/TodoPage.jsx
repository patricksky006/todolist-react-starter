import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';
const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState(dummyTodos);

    function handleOnChange(e) {
      setInputValue(e.target.value);
    }

    function handleOnAddTodo(){
      if (inputValue.length===0){
        return
      }
      setTodos((prevTodos)=> {
        return(
          [{
            id: Math.random()*100,
            title: inputValue,
            isDone: false,
          },
          ...prevTodos]
        )
      })
      setInputValue('')
    }
  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleOnChange}
        onAddTodo={handleOnAddTodo}
      />
      <TodoCollection todos={todos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
