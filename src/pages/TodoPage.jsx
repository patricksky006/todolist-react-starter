import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';


const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth(); // 取出需要的狀態與方法

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleDone = async ({ id }) => {
    const currentTodo = todos.find((todo) => todo.id === id); //找出點選id的todo

    try {
      await patchTodo({ id, isDone: !currentTodo.isDone }); //負責處理資料庫的isDone
      setTodos((todos) => {
        return todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };
  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({ id, title });

      setTodos((todos) => {
        return todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title: title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteItem = async ({ id }) => {
    try {
      await deleteTodo(id);
      setTodos((todos) => {
        return todos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  //載入頁面時候，從後端撈資料出來
  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  //檢查是否token合法
  useEffect(() => {
    if (isAuthenticated) {
      return;
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      TodoPage
      <Header username={currentMember} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDeleteItem}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
