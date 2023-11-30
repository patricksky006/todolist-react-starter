import styled from 'styled-components';

const StyledAddTodoContainer = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0 12px;
  box-shadow: 0 17px 0 -16px #e5e5e5;
  flex-wrap: wrap;

  &.active {
    box-shadow: 0 17px 0 -16px var(--major);
  }
`;

const StyledLabelIcon = styled.label`
  display: inline-flex;
  font-size: 30px;
  transition: color 0.2s ease-out;
  font-weight: 300;

  &:after {
    content: '+';
  }
`;

const StyledInputContainer = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  flex: 1;
  user-select: none;

  input {
    flex: 1;
    padding: 8px 12px;
    border: 0;
    outline: 0;
    font-size: 1rem;

    &::placeholder {
      color: var(--major);
      font-size: 13px;
    }
  }
  $.active {
    input::placeholder {
      color: var(--gray);
    }
  }
`;

const StyledAddTodoActionContainer = styled.div`
  button {
    font-size: 13px;
    color: var(--major);
    padding-right: 5px;
    display: none;
  }

  &.active {
    button {
      display: block;
    }
  }
`;

//inputValue : 代表使用者當前輸入的值
//onChange: 監聽輸入框 value 產生的任何變化
//onKeyDone: 監聽使用者按下 Enter 鍵
//onAddTodo: 監聽使用者點擊新增按鈕，讓外部的元件知道有新的 todo 要加進來了
const TodoInput = ({inputValue, onChange, onKeyDone, onAddTodo}) => {
  return (
    <StyledAddTodoContainer>
      <StyledLabelIcon className="icon" htmlFor="add-todo-input" />
      <StyledInputContainer>
        <input id="add-todo-input" type="text" placeholder="新增工作" />
      </StyledInputContainer>
      <StyledAddTodoActionContainer>
        <button className="btn-reset">新增</button>
      </StyledAddTodoActionContainer>
    </StyledAddTodoContainer>
  );
};

export default TodoInput;
